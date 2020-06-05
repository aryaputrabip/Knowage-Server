DROP TABLE IF EXISTS SBI_GL_ATTRIBUTES CASCADE;
DROP TABLE IF EXISTS SBI_GL_CONTENTS CASCADE;
DROP TABLE IF EXISTS SBI_GL_DOCWLIST CASCADE;
DROP TABLE IF EXISTS SBI_GL_GLOSSARY CASCADE;
DROP TABLE IF EXISTS SBI_GL_REFERENCES CASCADE;
DROP TABLE IF EXISTS SBI_GL_WLIST CASCADE;
DROP TABLE IF EXISTS SBI_GL_WORD CASCADE;
DROP TABLE IF EXISTS SBI_GL_WORD_ATTR CASCADE;
DROP TABLE IF EXISTS SBI_IMAGES CASCADE;
DROP TABLE IF EXISTS SBI_ORGANIZATION_PRODUCT_TYPE CASCADE;
DROP TABLE IF EXISTS SBI_PRODUCT_TYPE CASCADE;
DROP TABLE IF EXISTS SBI_PRODUCT_TYPE_ENGINE CASCADE;
DROP TABLE IF EXISTS SBI_ROLES_LAYERS CASCADE;
DROP TABLE IF EXISTS SBI_TIMESPAN CASCADE;
DROP TABLE IF EXISTS SBI_WS_EVENT CASCADE;
DROP TABLE IF EXISTS SBI_GL_BNESS_CLS_WLIST CASCADE;
DROP TABLE IF EXISTS SBI_GL_DATASETWLIST CASCADE;
DROP TABLE IF EXISTS SBI_GL_TABLE_WLIST CASCADE;

DROP TABLE IF EXISTS SBI_ARTIFACTS_VERSIONS CASCADE ;
DROP TABLE IF EXISTS SBI_ARTIFACTS CASCADE ;
DROP TABLE IF EXISTS SBI_META_MODELS_VERSIONS CASCADE ;
DROP TABLE IF EXISTS SBI_META_MODELS CASCADE ;
DROP TABLE IF EXISTS SBI_EXT_ROLES_CATEGORY CASCADE ;
-- DROP TABLE IF EXISTS SBI_KPI_COMMENTS CASCADE;
-- DROP TABLE IF EXISTS SBI_ORG_UNIT_GRANT_NODES CASCADE;
-- DROP TABLE IF EXISTS SBI_ORG_UNIT_GRANT CASCADE;
-- DROP TABLE IF EXISTS SBI_ORG_UNIT_NODES CASCADE;
-- DROP TABLE IF EXISTS SBI_ORG_UNIT_HIERARCHIES CASCADE;
-- DROP TABLE IF EXISTS SBI_ORG_UNIT CASCADE;
DROP TABLE IF EXISTS SBI_DATA_SET CASCADE;
DROP TABLE IF EXISTS SBI_OBJECTS_RATING CASCADE;
DROP TABLE IF EXISTS SBI_REMEMBER_ME CASCADE;
DROP TABLE IF EXISTS SBI_AUDIT CASCADE;
DROP TABLE IF EXISTS SBI_EVENTS_ROLES CASCADE;
DROP TABLE IF EXISTS SBI_EVENTS_LOG CASCADE;
DROP TABLE IF EXISTS SBI_EVENTS CASCADE;
DROP TABLE IF EXISTS SBI_SUBREPORTS CASCADE;
DROP TABLE IF EXISTS SBI_OBJ_PARUSE CASCADE;
DROP TABLE IF EXISTS SBI_OBJ_PARVIEW CASCADE;
DROP TABLE IF EXISTS SBI_PARUSE_CK CASCADE;
DROP TABLE IF EXISTS SBI_PARUSE_DET CASCADE;
DROP TABLE IF EXISTS SBI_PARUSE CASCADE;
DROP TABLE IF EXISTS SBI_FUNC_ROLE CASCADE;
DROP TABLE IF EXISTS SBI_OBJ_FUNC CASCADE;
DROP TABLE IF EXISTS SBI_FUNCTIONS CASCADE;
DROP TABLE IF EXISTS SBI_CHECKS CASCADE;
DROP TABLE IF EXISTS SBI_OBJ_PAR CASCADE;
DROP TABLE IF EXISTS SBI_PARAMETERS CASCADE;
DROP TABLE IF EXISTS SBI_OBJECT_NOTES CASCADE;
DROP TABLE IF EXISTS SBI_OBJECT_TEMPLATES CASCADE;
DROP TABLE IF EXISTS SBI_BINARY_CONTENTS CASCADE;
DROP TABLE IF EXISTS SBI_SNAPSHOTS CASCADE;
DROP TABLE IF EXISTS SBI_SUBOBJECTS CASCADE;
DROP TABLE IF EXISTS SBI_USER_FUNC CASCADE;
DROP TABLE IF EXISTS SBI_ROLE_TYPE_USER_FUNC CASCADE;
DROP TABLE IF EXISTS SBI_OBJ_STATE CASCADE;
DROP TABLE IF EXISTS SBI_OBJECTS CASCADE;
DROP TABLE IF EXISTS SBI_EXT_ROLES CASCADE;
DROP TABLE IF EXISTS SBI_LOV  CASCADE;
DROP TABLE IF EXISTS SBI_ENGINES CASCADE;
DROP TABLE IF EXISTS SBI_DOMAINS CASCADE;
DROP TABLE IF EXISTS SBI_GEO_MAP_FEATURES CASCADE;
DROP TABLE IF EXISTS SBI_GEO_FEATURES CASCADE;
DROP TABLE IF EXISTS SBI_GEO_MAPS CASCADE;
DROP TABLE IF EXISTS SBI_GEO_LAYERS CASCADE;
DROP TABLE IF EXISTS SBI_VIEWPOINTS CASCADE;
DROP TABLE IF EXISTS SBI_DATA_SOURCE CASCADE;
DROP TABLE IF EXISTS SBI_MENU_ROLE CASCADE;
DROP TABLE IF EXISTS SBI_MENU CASCADE;
DROP TABLE IF EXISTS SBI_DIST_LIST_OBJECTS CASCADE;
DROP TABLE IF EXISTS SBI_DIST_LIST_USER CASCADE;
DROP TABLE IF EXISTS SBI_DIST_LIST CASCADE;
-- DROP TABLE IF EXISTS SBI_KPI_MODEL_RESOURCES CASCADE;
-- DROP TABLE IF EXISTS SBI_RESOURCES CASCADE;
-- DROP TABLE IF EXISTS SBI_KPI_MODEL_INST CASCADE;
-- DROP TABLE IF EXISTS SBI_KPI_INST_PERIOD CASCADE;
-- DROP TABLE IF EXISTS SBI_KPI_INSTANCE_HISTORY CASCADE;
-- DROP TABLE IF EXISTS SBI_KPI_INSTANCE CASCADE;
-- DROP TABLE IF EXISTS SBI_KPI_PERIODICITY CASCADE;
-- DROP TABLE IF EXISTS SBI_KPI_MODEL CASCADE;
-- DROP TABLE IF EXISTS SBI_THRESHOLD_VALUE CASCADE;
-- DROP TABLE IF EXISTS SBI_THRESHOLD CASCADE;
-- DROP TABLE IF EXIST S SBI_MEASURE_UNIT CASCADE;
-- DROP TABLE IF EXISTS SBI_ALARM_DISTRIBUTION CASCADE;
-- DROP TABLE IF EXISTS SBI_ALARM_CONTACT CASCADE;
-- DROP TABLE IF EXISTS SBI_ALARM_EVENT CASCADE;
-- DROP TABLE IF EXISTS SBI_ALARM CASCADE;
DROP TABLE IF EXISTS SBI_KPI_VALUE CASCADE;
-- DROP TABLE IF EXISTS SBI_KPI CASCADE;
-- DROP TABLE IF EXISTS SBI_KPI_ROLE CASCADE;
DROP TABLE IF EXISTS SBI_EXPORTERS CASCADE ;
DROP TABLE IF EXISTS SBI_OBJ_METACONTENTS CASCADE ;
DROP TABLE IF EXISTS SBI_OBJ_METADATA CASCADE ;
DROP TABLE IF EXISTS SBI_CONFIG CASCADE ;
DROP TABLE IF EXISTS SBI_UDP_VALUE CASCADE ;
DROP TABLE IF EXISTS SBI_UDP CASCADE ;
-- DROP TABLE IF EXISTS SBI_GOAL CASCADE;  
-- DROP TABLE IF EXISTS SBI_GOAL_HIERARCHY CASCADE;  
-- DROP TABLE IF EXISTS SBI_GOAL_KPI CASCADE;  
DROP TABLE IF EXISTS SBI_ACTIVITY_MONITORING CASCADE; 
DROP TABLE IF EXISTS SBI_ATTRIBUTE CASCADE;  
DROP TABLE IF EXISTS SBI_EXT_USER_ROLES CASCADE; 
-- DROP TABLE IF EXISTS SBI_KPI_DOCUMENTS CASCADE; 
DROP TABLE IF EXISTS hibernate_sequences CASCADE; 
-- DROP TABLE IF EXISTS SBI_KPI_ERROR CASCADE; 
-- DROP TABLE IF EXISTS SBI_KPI_REL CASCADE; 
DROP TABLE IF EXISTS SBI_USER CASCADE; 
DROP TABLE IF EXISTS SBI_USER_ATTRIBUTES CASCADE;
DROP TABLE IF EXISTS SBI_PROGRESS_THREAD CASCADE;  
DROP TABLE IF EXISTS SBI_I18N_MESSAGES CASCADE;
DROP TABLE IF EXISTS SBI_ORGANIZATIONS CASCADE;
DROP TABLE IF EXISTS SBI_COMMUNITY CASCADE;
DROP TABLE IF EXISTS SBI_COMMUNITY_USERS CASCADE;
DROP TABLE IF EXISTS SBI_AUTHORIZATIONS CASCADE;
DROP TABLE IF EXISTS SBI_AUTHORIZATIONS_ROLES CASCADE;
DROP TABLE IF EXISTS SBI_ORGANIZATION_DATASOURCE CASCADE;
DROP TABLE IF EXISTS SBI_TRIGGER_PAUSED CASCADE;
DROP TABLE IF EXISTS SBI_CACHE_ITEM CASCADE;
DROP TABLE IF EXISTS SBI_OBJ_DATA_SET CASCADE;
DROP TABLE IF EXISTS SBI_FEDERATION_DEFINITION CASCADE;
DROP TABLE IF EXISTS SBI_DATA_SET_FEDERATION CASCADE;
DROP TABLE IF EXISTS SBI_META_JOB_TABLE CASCADE ;
DROP TABLE IF EXISTS SBI_META_JOB_SOURCE CASCADE ;
DROP TABLE IF EXISTS SBI_META_OBJ_DS CASCADE ;
DROP TABLE IF EXISTS SBI_META_DS_BC CASCADE ;
DROP TABLE IF EXISTS SBI_META_BC_ATTRIBUTE CASCADE ;
DROP TABLE IF EXISTS SBI_META_TABLE_BC CASCADE ;
DROP TABLE IF EXISTS SBI_META_BC CASCADE ;
DROP TABLE IF EXISTS SBI_META_TABLE_COLUMN CASCADE ;
DROP TABLE IF EXISTS SBI_META_TABLE CASCADE ;
DROP TABLE IF EXISTS SBI_META_SOURCE CASCADE ;
DROP TABLE IF EXISTS SBI_META_JOB CASCADE ;
DROP TABLE IF EXISTS SBI_META_DATASET_REL CASCADE ;
DROP TABLE IF EXISTS SBI_META_DOCUMENT_REL CASCADE ;

DROP TABLE IF EXISTS SBI_ALERT CASCADE ;
DROP TABLE IF EXISTS SBI_ALERT_ACTION CASCADE ;
DROP TABLE IF EXISTS SBI_ALERT_LISTENER CASCADE ;
DROP TABLE IF EXISTS SBI_ALERT_LOG CASCADE ;
DROP TABLE IF EXISTS SBI_CATALOG_FUNCTION CASCADE ;
DROP TABLE IF EXISTS SBI_CROSS_NAVIGATION CASCADE ;
DROP TABLE IF EXISTS SBI_CROSS_NAVIGATION_PAR CASCADE ;
DROP TABLE IF EXISTS SBI_FUNCTION_INPUT_DATASET CASCADE ;
DROP TABLE IF EXISTS SBI_FUNCTION_INPUT_VARIABLE CASCADE ;
DROP TABLE IF EXISTS SBI_FUNCTION_OUTPUT CASCADE ;
DROP TABLE IF EXISTS SBI_KPI_ALIAS CASCADE ;
DROP TABLE IF EXISTS SBI_KPI_EXECUTION CASCADE ;
DROP TABLE IF EXISTS SBI_KPI_EXECUTION_FILTER CASCADE ;
DROP TABLE IF EXISTS SBI_KPI_EXECUTION_KPI CASCADE ;
DROP TABLE IF EXISTS SBI_KPI_KPI CASCADE ;
DROP TABLE IF EXISTS SBI_KPI_KPI_RULE_OUTPUT CASCADE ;
DROP TABLE IF EXISTS SBI_KPI_PLACEHOLDER CASCADE ;
DROP TABLE IF EXISTS SBI_KPI_RULE CASCADE ;
DROP TABLE IF EXISTS SBI_KPI_RULE_OUTPUT CASCADE ;
DROP TABLE IF EXISTS SBI_KPI_RULE_PLACEHOLDER CASCADE ;
DROP TABLE IF EXISTS SBI_KPI_SCORECARD CASCADE ;
DROP TABLE IF EXISTS SBI_KPI_SCORECARD_KPI CASCADE ;
DROP TABLE IF EXISTS SBI_KPI_TARGET CASCADE ;
DROP TABLE IF EXISTS SBI_KPI_TARGET_VALUE CASCADE ;
DROP TABLE IF EXISTS SBI_KPI_THRESHOLD CASCADE ;
DROP TABLE IF EXISTS SBI_KPI_THRESHOLD_VALUE CASCADE ;
DROP TABLE IF EXISTS SBI_KPI_VALUE_EXEC_LOG CASCADE ;
DROP TABLE IF EXISTS SBI_OUTPUT_PARAMETER CASCADE ;
DROP TABLE IF EXISTS SBI_OBJ_FUNC_ORGANIZER CASCADE;
DROP TABLE IF EXISTS SBI_FUNCTIONS_ORGANIZER CASCADE;
DROP TABLE IF EXISTS SBI_WHATIF_WORKFLOW CASCADE;
DROP TABLE IF EXISTS SBI_ACCESSIBILITY_PREFERENCES CASCADE;
DROP TABLE IF EXISTS SBI_FUNCTION_INPUT_FILE CASCADE;
DROP TABLE IF EXISTS SBI_DOSSIER_ACTIVITY CASCADE;
DROP TABLE IF EXISTS SBI_DATA_SET_TAG CASCADE;
DROP TABLE IF EXISTS SBI_METAMODEL_PAR CASCADE;
DROP TABLE IF EXISTS SBI_METAMODEL_PARUSE CASCADE;
DROP TABLE IF EXISTS SBI_METAMODEL_PARVIEW CASCADE;
DROP TABLE IF EXISTS SBI_METAMODEL_VIEWPOINTS CASCADE;
DROP TABLE IF EXISTS SBI_NEWS CASCADE;
DROP TABLE IF EXISTS SBI_NEWS_READ CASCADE;
DROP TABLE IF EXISTS SBI_NEWS_ROLES CASCADE;
DROP TABLE IF EXISTS SBI_TAG CASCADE;