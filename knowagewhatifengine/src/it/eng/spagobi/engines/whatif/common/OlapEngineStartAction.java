/*
 * Knowage, Open Source Business Intelligence suite
 * Copyright (C) 2016 Engineering Ingegneria Informatica S.p.A.
 *
 * Knowage is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Knowage is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

package it.eng.spagobi.engines.whatif.common;

import it.eng.spagobi.services.rest.annotations.ManageAuthorization;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import org.apache.log4j.Logger;

@Path("/olap/startolap")
@ManageAuthorization
public class OlapEngineStartAction extends WhatIfEngineAbstractStartAction {

	public static transient Logger logger = Logger.getLogger(OlapEngineStartAction.class);
	
	@GET
	@Path("/")
	@Produces("text/html")
	public void startActionOlap() {
		logger.debug("Starting OLAP");
		startAction(false);

	}
}
