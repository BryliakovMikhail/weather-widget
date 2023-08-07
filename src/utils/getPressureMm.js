const PRESSURE_UNITS = 0.750062

export default function getPressureMm(hpa){
    return Math.round(hpa * PRESSURE_UNITS)
}