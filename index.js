const express = require('express');
const cors = require('cors');
const { DestinyBoard, DestinyConfigBuilder, DayTimeGround, ConfigType, Gender } = require('fortel-ziweidoushu');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Helper function to validate date parameters
const validateDateParams = (params) => {
    const { year, month, day } = params;
    if (!year || !month || !day) {
        throw new Error('Missing required date parameters');
    }
    if (year < 1900 || year > 2100) {
        throw new Error('Year must be between 1900 and 2100');
    }
    if (month < 1 || month > 12) {
        throw new Error('Month must be between 1 and 12');
    }
    if (day < 1 || day > 31) {
        throw new Error('Day must be between 1 and 31');
    }
};

// Create chart using lunar calendar
app.post('/api/chart/lunar', (req, res) => {
    try {
        const { year, month, day, bornTime, gender, isLeapMonth = false } = req.body;

        validateDateParams({ year, month, day });

        if (!bornTime || !gender) {
            throw new Error('Missing required parameters: bornTime or gender');
        }

        const config = {
            year,
            month,
            day,
            isLeapMonth,
            bornTimeGround: DayTimeGround.getByName(bornTime),
            configType: ConfigType.SKY,
            gender: gender.toUpperCase() === 'F' ? Gender.F : Gender.M,
        };

        const destinyBoard = new DestinyBoard(
            DestinyConfigBuilder.withLunar(config)
        );

        res.json({
            success: true,
            chart: destinyBoard.toString(),
            config: destinyBoard.config,
            element: destinyBoard.element,
            destinyMaster: destinyBoard.destinyMaster,
            bodyMaster: destinyBoard.bodyMaster,
            cells: destinyBoard.cells
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

// Create chart using solar calendar
app.post('/api/chart/solar', (req, res) => {
    try {
        const { year, month, day, bornTime, gender } = req.body;

        validateDateParams({ year, month, day });

        if (!bornTime || !gender) {
            throw new Error('Missing required parameters: bornTime or gender');
        }

        const config = {
            year,
            month,
            day,
            bornTimeGround: DayTimeGround.getByHour(bornTime.split(':')[0]),
            configType: ConfigType.SKY,
            gender: gender.toUpperCase() === 'F' ? Gender.F : Gender.M,
        };
        const destinyBoard = new DestinyBoard(
            DestinyConfigBuilder.withSolar(config)
        );
        res.json({
            success: true,
            chart: destinyBoard.toString(),
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

// Create chart using text description
app.post('/api/chart/text', (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            throw new Error('Missing required parameter: text');
        }

        const destinyBoard = new DestinyBoard(
            DestinyConfigBuilder.withText(text)
        );

        res.json({
            success: true,
            chart: destinyBoard.toString(),
            config: destinyBoard.config,
            element: destinyBoard.element,
            destinyMaster: destinyBoard.destinyMaster,
            bodyMaster: destinyBoard.bodyMaster,
            cells: destinyBoard.cells
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Zi Wei Dou Shu API server running on port ${port}`);
}); 