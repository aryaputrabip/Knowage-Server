package it.eng.spagobi.meta.cwm.jmi.spagobi.meta.olap;

import it.eng.spagobi.meta.cwm.jmi.spagobi.meta.core.CwmProcedureExpression;
import it.eng.spagobi.meta.cwm.jmi.spagobi.meta.core.VisibilityKind;
import javax.jmi.reflect.RefClass;

public abstract interface CwmContentMapClass
  extends RefClass
{
  public abstract CwmContentMap createCwmContentMap();
  
  public abstract CwmContentMap createCwmContentMap(String paramString1, VisibilityKind paramVisibilityKind, CwmProcedureExpression paramCwmProcedureExpression, String paramString2, boolean paramBoolean);
}
