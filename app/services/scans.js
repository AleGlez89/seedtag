//Check protocols received 
function getEnabledCoordinates(protocols, scan){  
    let tmpScan = scan
    let tmpProt = ''
    let result   

    if(protocols.length > 1){
        protocols.map(protocol=>{
            if(protocol !== 'closest-enemies' && protocol !== 'furthest-enemies'){
                tmpScan = getCoordinatesByProtocol(protocol, tmpScan)
            } else {
                tmpProt = protocol
            }   
        })
        if(tmpProt !== ''){
            tmpScan = descartMore100Metros(tmpScan)
            result = getCoordinatesByProtocol(tmpProt, tmpScan)  
            result = result[0].coordinates 
        } 
    } else {
        tmpScan = getCoordinatesByProtocol(protocols[0], tmpScan)
        result = tmpScan[0].coordinates
    }

    return result     
}
//Return coordinates by protocol received
function getCoordinatesByProtocol(protocol, scan){
    let result = []
    switch (protocol) {
    case 'closest-enemies': 
        result =  minDistance(scan)  
        return result
    case 'furthest-enemies':
        result =  maxDistance(scan)  
        return result
    case 'assist-allies':
        const filter = scan.filter(scans => scans.allies && scans.allies > 0) 
        return filter
    case 'avoid-crossfire':
        const filters = scan.filter(scans => !scans.allies || scans.allies === 0)      
        return filters
    case 'prioritize-mech':      
        const filterMech = scan.filter(scans => scans.enemies && scans.enemies.type === 'mech')
        if(filterMech.length > 0){
        } else {
            const filterMech = scan.filter(scans => scans.enemies && scans.enemies.type !== 'mech')
        }
        return filterMech
    case 'avoid-mech':
        const filterNotMech = scan.filter(scans => scans.enemies && scans.enemies.type !== 'mech')  
        return filterNotMech
    default:
    return result
    }
}

/*Functions helpers
 * 
 */
//Calculate distance in meters
function getDistanciaMetros(lat1,lon1,lat2,lon2){
    rad = function(x) {return x*Math.PI/180;}
    var R = 6378.137; //Radio de la tierra en km 
    var dLat = rad( lat2 - lat1 );
    var dLong = rad( lon2 - lon1 );
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * 
    Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
    //aquí obtienes la distancia en metros por la conversion 1Km =1000m
    var d = R * c * 1000; 
    return d ; 
}
//Calculate distance
function getDistanceTwoPoints(lat1,lon1,lat2,lon2)
{
    var dLat  = Math.pow(lat2 - lat1,2)
    var dLong = Math.pow(lon2 - lon1,2)
    var resul = Math.sqrt(dLat + dLong)    
    return resul ; 
}
//Calculate distance (MIN)
function minDistance(scan){
    let al = scan.length
    valueMetros = getDistanceTwoPoints(scan[al-1].coordinates.x,scan[al-1].coordinates.y,0,0)
    resultValue = scan[al-1];

    while (al--){
        let tmp = getDistanceTwoPoints(scan[al].coordinates.x, scan[al].coordinates.y,0,0)
        if(tmp < valueMetros){
            valueMetros = tmp
            resultValue = scan[al]
        }
    }
    return [resultValue]
}
//Calculate distance (MAX)
function maxDistance(scan){
    let al = scan.length
    valueMetros = getDistanceTwoPoints(scan[al-1].coordinates.x,scan[al-1].coordinates.y,0,0)
    resultValue = scan[al-1];
    while (al--){
        let tmp = getDistanceTwoPoints(scan[al].coordinates.x, scan[al].coordinates.y,0,0)
        if(tmp > valueMetros){
            valueMetros = tmp
            resultValue = scan[al]
        }
    }
    return [resultValue]
}
function descartMore100Metros(scan){
//esta funcion debe llama a la de calcular la distancia en metros, pero los valores dan muy defasados
//return getDistanciaMetros(x,x,y,y)
return scan
}
module.exports = {getEnabledCoordinates}