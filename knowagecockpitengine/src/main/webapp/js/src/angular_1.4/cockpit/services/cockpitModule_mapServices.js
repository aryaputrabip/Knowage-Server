(function() {
	angular
	.module("cockpitModule")
	.service("cockpitModule_mapServices",CockpitModuleMapServiceController)
		function CockpitModuleMapServiceController(
				sbiModule_translate,
				sbiModule_restServices,
				cockpitModule_template,
				$q, 
				$mdPanel,
				cockpitModule_widgetSelection,
				cockpitModule_properties,
				cockpitModule_utilstServices, 
				$rootScope){
	
		var ms = this; //mapServices
		var activeInd;
		var activeConf;
		var cacheProportionalSymbolMinMax;
		
		ms.getFeaturesDetails = function(geoColumn, selectedMeasure, config, configColumns, values){
			if (values != undefined){
				var geoFieldName;
				var geoFieldValue;			
				var	featuresSource = new ol.source.Vector();
				 
				for(var k=0; k < values.metaData.fields.length; k++){
					var field = values.metaData.fields[k];
					if (field.header === geoColumn){
						geoFieldName = field.name;
						break;
					}
				}
				if (geoFieldName){
					for(var r=0; r < values.rows.length; r++){
						//get coordinates
						var lonlat;
						var row = values.rows[r];
						geoFieldValue = row[geoFieldName].trim();
						if (geoFieldValue.indexOf(" ") > 0){
							lonlat = geoFieldValue.split(" ");
						}else if (geoFieldValue.indexOf(",")){
							lonlat = geoFieldValue.split(",");
						}else{
							sbiModule_messaging.showInfoMessage(sbiModule_translate.load('sbi.cockpit.map.lonLatError').replace("{0}",geoColumn).replace("{1}",geoFieldValue), 'Title', 0);
							console.log("Error getting longitude and latitude from column value ["+ geoColumn +"]. Check the dataset and its metadata.");
							return null;
						}
						if (lonlat.length != 2){
							sbiModule_messaging.showInfoMessage(sbiModule_translate.load('sbi.cockpit.map.lonLatError').replace("{0}",geoColumn).replace("{1}",geoFieldValue), 'Title', 0);
							console.log("Error getting longitude and latitude from column value ["+ geoColumn +"]. Check the dataset and its metadata.");
							return null;
						}
						if (!selectedMeasure) selectedMeasure = config.defaultIndicator;
						ms.setActiveIndicator(selectedMeasure);
						if (config.analysisConf && config.analysisConf.defaultAnalysis == 'proportionalSymbol'){							
							//get config for thematize
							if (selectedMeasure){
								if (!ms.getCacheProportionalSymbolMinMax()) ms.setCacheProportionalSymbolMinMax({}); //just at beginning
								if (!ms.getCacheProportionalSymbolMinMax().hasOwnProperty(selectedMeasure)){
									ms.loadIndicatorMaxMinVal(selectedMeasure, values);
								}
							}
						}
						
						//set ol objects
						var transform = ol.proj.getTransform('EPSG:4326', 'EPSG:3857');
						var feature = new ol.Feature();  
				        var coordinate = transform([parseFloat(lonlat[0].trim()), parseFloat(lonlat[1].trim())]);
				        var geometry = new ol.geom.Point(coordinate);
				        feature.setGeometry(geometry);
				        ms.addDsPropertiesToFeature(feature, row, configColumns, values.metaData.fields);
				       //at least add the layer owner
				        feature.set("parentLayer",config.name);
				        featuresSource.addFeature(feature);
					}
					
					return featuresSource;
				}
			}
			return new ol.source.Vector();
		}
	    
		ms.addDsPropertiesToFeature = function (f, row, cols, meta){
			//add columns value like properties
			for (c in row){
				var header = ms.getHeaderByColumnName(c, meta);
				var prop = {};
				prop.value = row[c];
				for (p in cols){
					if (cols[p].alias == header){
						prop.type = cols[p].fieldType;
						prop.aggregationSelected = ( cols[p].properties && cols[p].properties.aggregationSelected) ? cols[p].properties.aggregationSelected : '';
						break;
					}
				}
				f.set(header, prop);
			}
		}
		
		ms.getHeaderByColumnName = function(cn, fields) {
			var toReturn = cn;
			
			for (n in fields){
				if (fields[n] && fields[n].name === cn){
					return fields[n].header;
				}
			}
			return toReturn;
		}
		
	
		
	    var styleCache = {};
	    ms.layerStyle = function(feature, resolution){
	    	
	    	var localFeature;
			if (Array.isArray(feature.get('features')))
				localFeature = feature.get('features')[0];
	    	else
	    		localFeature = feature;
	    	
	    	
			var props  = localFeature.getProperties();
			var parentLayer = localFeature.get('parentLayer');
			var config = ms.getActiveConf(parentLayer);
			var configThematizer = config.analysisConf || {};
			var configMarker = config.markerConf || {};
			var useCache = false; //cache isn't use for analysis, just with fixed marker
			var isCluster = (config.markerConf && config.markerConf.type == 'cluster') ? true : false;
			var value;
			var style;
			
			if (isCluster){
				value = ms.getClusteredValue(feature, config.markerConf);
			}else{
				value =  props[ms.getActiveIndicator()] || 0;
			}
			
			var thematized = false;
			if (configThematizer.defaultAnalysis == 'choropleth') {
				style = ms.getChoroplethStyles(value, props, configThematizer.choropleth, configMarker);
				thematized = true;
			}else if (configThematizer.defaultAnalysis == 'proportionalSymbol') {
				style = ms.getProportionalSymbolStyles(value, props, configThematizer.proportionalSymbol);
				thematized = true;
			}
			
			if (!thematized && isCluster){
				style = ms.getClusterStyles(value, props, configMarker);
				useCache = false;
			}
			else{
				style = ms.getOnlyMarkerStyles(props, configMarker);
				useCache = true;
			}
			
			if (useCache && !styleCache[parentLayer]) {
		          styleCache[parentLayer] = style;
		          return styleCache[parentLayer] ;
			} else {
				return style;
			}
	    }
	    
	    ms.getClusteredValue = function (feature, configCluster) { 
	    	var toReturn = 0;
	    	var total = 0;
	    	var values = [];
	    	var aggregationFunc = "";
	    	
	    	if (Array.isArray(feature.get('features'))){
	    		for (var i=0; i<feature.get('features').length; i++){
					var tmpValue = (feature.get('features')[i].get(ms.activeInd)) ? feature.get('features')[i].get(ms.activeInd).value : 0;
//					console.log("tmpValue: " , tmpValue);
					aggregationFunc = (feature.get('features')[i].get(ms.activeInd)) ? feature.get('features')[i].get(ms.activeInd).aggregationSelected : "SUM";
					values.push(tmpValue);
					total += tmpValue;
				}
				
	    		switch(aggregationFunc) {
				    case "MIN": 
				    	toReturn = Math.min.apply(null, values);
				        break;
				    case "MAX":
				    	toReturn = Math.max.apply(null, values);
				    	break;
				    case "SUM": 
				    	toReturn = total;
				    	break;
				    case  "AVG":
				    	if (total > 0)
				    		toReturn = (total/feature.get('features').length);
				    		break;
				    case "COUNT":
				    	toReturn = feature.get('features').length;
				    	break;
				    default: //SUM
				    	toReturn = total;
	    		}			
				
				
	    	}
	    	else{
	    		toReturn += feature.get(ms.activeInd);
	    	}
//	    	console.log("fucnt: ["+ configCluster.aggregationSelected +"] - toReturn ", toReturn);
			return toReturn;
	    }
	    
	    ms.getClusterStyles = function (value, props, config){
	      return new ol.style.Style({
	              image: new ol.style.Circle({
	                radius: config.radiusSize || 20,
	                stroke: new ol.style.Stroke({
	                  color: '#fff'
	                }),
	                fill: new ol.style.Fill({
	                  color: (config.style && config.style['background-color']) ? config.style['background-color'] : 'blue'
	                })
	              }),
	              text: new ol.style.Text({
	            	font: (config.style && config.style['font-size']) ? config.style['font-size'] : '12px',
	                text: value.toString(),
	                fill: new ol.style.Fill({
	                  color: (config.style && config.style['color']) ? config.style['color'] : '#fff'
	                })
	              })
	            });
	    }
		
		ms.getProportionalSymbolStyles = function(value, props, config){
			var textValue =  props[ms.activeInd] || "";
			return new ol.style.Style({
		          fill: new ol.style.Fill({
		                color :  config.color
		              }),
		              stroke: new ol.style.Stroke({
		                color: '#ffcc33',
		                width: 2
		              }),
		              image: new ol.style.Circle({
		                radius: ms.getProportionalSymbolSize(value, ms.activeInd, config),
//		            	radius: 20,
		                fill: new ol.style.Fill({
		                 color : config.style['color'] || 'blue',
		                })
		              }),
		              text: new ol.style.Text({
		                  font: config['font-size'] || '12px Calibri,sans-serif',
		                  fill: new ol.style.Fill({ color: '#000' }),
		                  stroke: new ol.style.Stroke({
		                    color: '#fff', width: 2
		                  }),
//		                  text: textValue.toString()
		                  text: value.toString()
		                })
		            });
		}
		
		ms.getChoroplethStyles = function(value, props, config){
			var textValue =  props[ms.activeInd] || "";
			
			return  [new ol.style.Style({
				stroke: new ol.style.Stroke({
					color: borderColor,
					width: 1
				}),
				fill: new ol.style.Fill({
					color: getChoroplethColor(dsValue,layerCol).color
				}),
				image: new ol.style.Circle({
		  			radius: 5,
		  			stroke: new ol.style.Stroke({
						color: borderColor,
						width: 1
					}),
		  			fill: new ol.style.Fill({
		  				color: getChoroplethColor(dsValue,layerCol).color
		  			})
		  		})
			})];
			
			return new ol.style.Style({
			});
		}
		
		ms.getOnlyMarkerStyles = function (props, config){
			var textValue =  props[ms.activeInd] || "";
			return new ol.style.Style({
				image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
					stroke: new ol.style.Stroke({ //border doesn't work
						color: 'red',
						width: 3
					}),
				    opacity: 1,
				    crossOrigin: 'anonymous',
				    color: (config.style && config.style.color) ? config.style.color : (config.color) ? config.color : 'blue',
//				    src: 'data/icon.png'
//				    src: 'https://www.mapz.com/map/marker/svg/M_marker_heart_150910.svg'
//				    src: 'https://s3.amazonaws.com/com.cartodb.users-assets.production/maki-icons/embassy-18.svg',
				    src: config.icon || 'https://openlayers.org/en/v4.6.4/examples/data/dot.png'
					}))
		          });
		}
	
		ms.getBaseLayer = function (conf){
			
			var toReturn;
			
			//check input configuration
			if (!conf || !conf.type){
				conf = {type:""}; //default case
			}
		
			switch(conf.type) {
			    case "OSM": case "OAM":
			    	toReturn = new ol.layer.Tile({
			   	    	visible: true,
			   	    	source: new ol.source.OSM({
				   	    	url:conf.url,
				   	    	attributions: conf.attributions || "",
			   	    		})
						});
			        break;
			    case "Stamen":
			    	//toner-hybrid, toner, toner-background, toner-hybrid, toner-labels, toner-lines, toner-lite,terrain, terrain-background, terrain-labels, terrain-lines
			    	toReturn = new ol.layer.Tile({
			   	    	visible: true,
			   	    	source: new ol.source.Stamen({
				   	    	layer: conf.layer,
			   	    		})
						});
			        break;
			    case "XYZ": //generic tiles (ex. for carto)
			    	toReturn = new ol.layer.Tile({
			   	    	visible: true,
			   	    	source: new ol.source.XYZ({
				   	    	url:conf.url,
				   	    	attributions: conf.attributions || "",
			   	    		})
						});
			    	break;
			    default: //OSM
			    		toReturn = new ol.layer.Tile({
				    		visible: true,
				      	    source: new ol.source.OSM()
				      	});
			}
	      
			return toReturn;
			
		}	
		
		ms.getProportionalSymbolSize = function(val, name, config){
			if (!name) return 0;
			
			var minValue = ms.cacheProportionalSymbolMinMax[name].minValue;
			var maxValue = ms.cacheProportionalSymbolMinMax[name].maxValue;
			var size;
			
			var maxRadiusSize = config.maxRadiusSize;
			var minRadiusSize = config.minRadiusSize;

			if(minValue == maxValue) { // we have only one point in the distribution
				size = (maxRadiusSize + minRadiusSize)/2;
			} else {
				size = ( parseInt(val) - minValue) / ( maxValue - minValue) * (maxRadiusSize - minRadiusSize) + minRadiusSize;
			}
//			console.log("propSymbSize ["+ size +"] for ["+name+"]");
			return (size < 0 ) ? 0 : size;
		}
		
		 ms.updateCoordinatesAndZoom = function(model, map, l, setValues){
		    	var coord;
		    	var zoom;
		    	
		    	if (model.content.currentView.center[0] == 0 && model.content.currentView.center[1] == 0){
			    	if (l.getSource().getFeatures().length>0 && l.getSource().getFeatures()[0].getGeometry().getType() == 'Point')
			    		coord = l.getSource().getFeatures()[0].getGeometry().getCoordinates();
					else
						coord = l.getSource().getFeatures()[0].getGeometry().getCoordinates()[0][0][0];
			    	
			    	if(l.getSource().getFeatures().length>35){
		    			zoom = 4;
					}else{
						zoom = 5;
					}
		    	
			    	//update coordinates and zoom within the template
			    	model.content.currentView.center = coord;
			    	model.content.currentView.zoom = zoom;
			    	
			    	if (setValues){
			    		map.getView().setCenter(coord);
			    		map.getView().setZoom(zoom);
			    	} 		
		    	}
		    }
		
		ms.getCacheProportionalSymbolMinMax=function(){
			return ms.cacheProportionalSymbolMinMax;
		}
		
		ms.setCacheProportionalSymbolMinMax=function(c){
			ms.cacheProportionalSymbolMinMax = c;
		}
		
		ms.getActiveIndicator=function(){
			return ms.activeInd;
		}
		
		ms.setActiveIndicator=function(i){
			ms.activeInd = i;
		}
		
		ms.getActiveConf=function(l){
			for (c in ms.activeConf){
				if (ms.activeConf[c].layer === l)
					return ms.activeConf[c].config;
			}
			return null;
		}
		
		ms.setActiveConf=function(l, c){
			if (!ms.activeConf)
				ms.activeConf = [];
			
			if (ms.getActiveConf(l) != null){
				ms.activeConf.splice(l,1);
			} 
			ms.activeConf.push({"layer": l, "config":c});
		}
		
		ms.loadIndicatorMaxMinVal=function(key, values){
			var minV;
			var maxV;
			for(var i=0;i<values.rows.length;i++){
				var colName = ms.getColumnName(key, values.metaData.fields);
				var tmpV= parseInt(values.rows[i][colName]);
				if(minV==undefined || tmpV<minV){
					minV=tmpV;
				}
				if(maxV==undefined || tmpV>maxV){
					maxV=tmpV;

				}
			}
			ms.cacheProportionalSymbolMinMax[key]={minValue:minV, maxValue:maxV};
		}
		
		function getChoroplethColor(val,layerCol){
			var color;
			var alpha;
			for(var i=0;i<tmtz.legendItem.choroplet.length;i++){
				if(parseInt(val)>=parseInt(tmtz.legendItem.choroplet[i].from) && parseInt(val)<parseInt(tmtz.legendItem.choroplet[i].to)){
					color=tmtz.legendItem.choroplet[i].color;
					alpha=tmtz.legendItem.choroplet[i].alpha;
					if(tmtz.legendItem.choroplet[i].itemFeatures.indexOf(layerCol)==-1){
						tmtz.legendItem.choroplet[i].itemFeatures.push(layerCol);
						tmtz.legendItem.choroplet[i].item++;
					}

					break;
				}
			}
			if(color==undefined){
				color=tmtz.legendItem.choroplet[tmtz.legendItem.choroplet.length-1].color;
				alpha=tmtz.legendItem.choroplet[tmtz.legendItem.choroplet.length-1].alpha;
				if(tmtz.legendItem.choroplet[tmtz.legendItem.choroplet.length-1].itemFeatures.indexOf(layerCol)==-1){
					tmtz.legendItem.choroplet[tmtz.legendItem.choroplet.length-1].itemFeatures.push(layerCol);
					tmtz.legendItem.choroplet[tmtz.legendItem.choroplet.length-1].item++;
				}
			}
			return {color:color,alpha:alpha};
		}

		ms.getColumnName = function(key, values){
			var toReturn = key;
			for (var v=0; v<values.length; v++){
				if (values[v].header === key)
					return values[v].name;
			}
				
			return toReturn;
		}
		
		ms.isCluster = function(feature) {
		  if (!feature || !feature.get('features')) { 
		        return false; 
		  }
		  return feature.get('features').length > 1;
		}
	}	

})();