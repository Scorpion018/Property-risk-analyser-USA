CREATE TABLE climate(
atom_id VARCHAR(20),
propertyLatitude   VARCHAR(20),
PropertyLongitude VARCHAR(20),
SitusStateCountyFIPS VARCHAR(20),
ParcelNumberRaw VARCHAR(20),
PropertyAddressFull VARCHAR(150),
PropertyAddressHouseNumber VARCHAR(50),
PropertyAddressStreetDirection VARCHAR(50),
PropertyAddressStreetName VARCHAR(100),
PropertyAddressStreetSuffix VARCHAR(20),
PropertyAddressStreetPostDirection VARCHAR(20),
PropertyAddressUnitPrefix VARCHAR(10),
PropertyAddressUnitValue VARCHAR(20),
PropertyAddressCity VARCHAR(20),
PropertyAddressState VARCHAR(20),
PropertyAddressZIP VARCHAR(20),
PropertyAddressZIP4 VARCHAR(20),
PropertyAddressCRRT VARCHAR(20),
HeatRiskScore VARCHAR(10),
HeatThresholdFahrenheit VARCHAR(10),
HeatBaselineAverage VARCHAR(10),
HeatFutureAverage  VARCHAR(10),
StormRiskScore VARCHAR(10),
StormBaselineAverageCounts VARCHAR(10),
StormBaselineAverageTotals VARCHAR(10),
StormFutureAverageCounts VARCHAR(10),
StormFutureAverageTotals VARCHAR(10),
WildfireRiskScore VARCHAR(10),
WildfireBaselineAverage VARCHAR(10),
WildfireMaxFutureAverage VARCHAR(10),
DroughtRiskScore VARCHAR(10),
DroughtBaselineAverage VARCHAR(10),
DroughtFutureAverage VARCHAR(10),
FloodHighTideFuture VARCHAR(10),
FloodDepthFuture VARCHAR(10),
FloodChanceFuture VARCHAR(10),
FloodFemaRisk VARCHAR(50),
FloodRiskScore VARCHAR(10),
TotalRisk VARCHAR(10)
);



SELECT csv2021.company_name , 
csv2021.ein , 
climate.propertyaddressfull, 
csv2021.street_address , 
csv2021.city , 
csv2021.state  ,  
csv2021.zip_code  ,  
csv2021.industry_description  ,  
csv2021.total_deaths  ,  
csv2021.total_dafw_cases  ,  
csv2021.total_djtr_cases  ,  
csv2021.total_injuries  ,  
csv2021.total_poisonings  ,  
csv2021.total_respiratory_conditions  ,  
csv2021.total_skin_disorders  ,  
csv2021.total_hearing_loss  ,  
climate.propertylatitude, 
climate.propertylongitude, 
climate.propertyaddressstreetname, 
climate.heatriskscore, 
climate.stormriskscore, 
climate.wildfireriskscore, 
climate.droughtriskscore, 
climate.floodriskscore,
climate.totalrisk
FROM csv2021, climate
WHERE (csv2021.establishment_name ILIKE '%Ricoh' OR csv2021.establishment_name ILIKE '%Ricoh%' OR csv2021.establishment_name ILIKE 'Ricoh%')  
AND (csv2021.street_address= '100 COLLEGE ST' AND climate.propertyaddressfull = '100 COLLEGE ST');




-- select * from csv2021 where company_name ilike '%mansfield' or company_name ilike 'mansfield%' or company_name ilike '%mansfield%'

 SELECT csv2021.company_name , 
    csv2021.ein , 
    climate.propertyaddressfull, 
    csv2021.street_address , 
    csv2021.city , 
    csv2021.state  ,  
    csv2021.zip_code  ,  
    csv2021.industry_description  ,  
    csv2021.annual_average_employees  ,  
    csv2021.total_deaths  ,  
    csv2021.total_dafw_cases  ,  
    csv2021.total_djtr_cases  ,  
    csv2021.total_injuries  ,  
    csv2021.total_poisonings  ,  
    csv2021.total_respiratory_conditions  ,  
    csv2021.total_skin_disorders  ,  
    csv2021.total_hearing_loss  ,  
    climate.propertylatitude, 
    climate.propertylongitude, 
    climate.propertyaddressstreetname, 
    climate.heatriskscore, 
    climate.stormriskscore, 
    climate.wildfireriskscore, 
    climate.droughtriskscore, 
    climate.floodriskscore,
    climate.totalrisk
    FROM csv2021, climate
    WHERE (csv2021.company_name ILIKE '%Harris Teeter' OR csv2021.company_name ILIKE '%Harris Teeter%' OR csv2021.company_name ILIKE 'Harris Teeter%') 
    AND (csv2021.street_address= '8538 PARK ROAD' AND climate.propertyaddressfull = '8538 PARK ROAD')
	
-- 	select * from csv2021 where company_name ilike 'Harris teeter%'