const fs = require('fs')
const path = require('path')

const DATA_DIR = path.join(process.cwd(), 'data')
const JSON_FILE = path.join(DATA_DIR, 'weather.json')
const CSV_FILE = path.join(DATA_DIR, 'weather_log.csv')

describe('Weather Data tests', () => {
    test('weather.json exists', () => {
        expect(fs.existsSync(JSON_FILE)).toBe(true)
    })

    test('weather.json has required keys', () => {
        const raw = fs.readFileSync(JSON_FILE, 'utf-8')
        expect(raw.trim().length).toBeGreaterThan(0)

        const data = JSON.parse(raw)
        expect(data).toHaveProperty('main')
        expect(data).toHaveProperty('weather')
        expect(data.weather[0]).toHaveProperty('description')
        expect(data).toHaveProperty('_last_updated_utc')

        expect(new Date(data._last_updated_utc).toISOString()).toBe(data._last_updated_utc)
    })


    test('CSV log exists and has header', () => {
        expect(fs.existsSync(CSV_FILE)).toBe(true)

        const csvContent = fs.readFileSync(CSV_FILE, 'utf-8')
        const lines = csvContent.trim().split('\n')
        const header = lines[0].split(',')

        expect(header).toEqual(['timestamp', 'city', 'temperature', 'description'])
        expect(lines.length).toBeGreaterThan(1)

        const firstDataRow = lines[1].split(',')
        expect(!isNaN(parseFloat(firstDataRow[2]))).toBe(true)
    })

        test('weather.json has numeric temperature data', () => {
        const data = JSON.parse(fs.readFileSync(JSON_FILE, 'utf-8'))

        expect(typeof data.main.temp).toBe('number')
        expect(Number.isFinite(data.main.temp)).toBe(true)
    })


    test('weather_log.csv contains a valid latest entry', () => {
        const lines = fs.readFileSync(CSV_FILE, 'utf-8').trim().split('\n')
        const latestEntry = lines.at(-1).split(',')

        expect(new Date(latestEntry[0]).toISOString()).toBe(latestEntry[0])
        expect(latestEntry[1].length).toBeGreaterThan(0)
        expect(Number.isFinite(parseFloat(latestEntry[2]))).toBe(true)
        expect(latestEntry[3].length).toBeGreaterThan(0)
    })
})