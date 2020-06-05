const db = require('../config/database');

const getUserConfig = async (email) => {
    return await db.query('SELECT * FROM config c WHERE email = $1 order by c.createdAt DESC', [email]).then(data => {
        if (data.rowCount === 0) {
            return null;
        } else {
            return config = {
                email: data.rows[0].email,
                shortBreak: Number(data.rows[0].shortbreak),
                duration: Number(data.rows[0].duration)
            }
        }
    });
}

const setUserConfig = async (config) => {
  let oldConfig = await getUserConfig(config.email);

    if(oldConfig == null){
        return await db.query('INSERT INTO config(email,duration,shortBreak) values ($1, $2, $3)', [config.email, config.duration, config.shortBreak]);
    }else{
        return await db.query('UPDATE config set duration = $1, shortBreak = $2 WHERE email = $3', [config.email, config.duration, config.shortBreak]);
    }
}

const logUserEffort = async (logUser) => {
    return await db.query('INSERT INTO daily_log(email,duration) values($1, $2)', [logUser.email, logUser.duration]);
}

const truncLogTable = async () => {
    return await db.query('TRUNCATE table daily_log');
}

const getYieldTime = async (email) => {
    return await db.query('SELECT SUM(duration) as yieldTime FROM daily_log WHERE email = $1 AND createdat > now()::date', [email]).then(data => {
        if (data.rowCount === 0) {
            return null;
        } else {
            return Number(data.rows[0].yieldtime);
        }
    })
}

module.exports = { getUserConfig, setUserConfig, getYieldTime, logUserEffort };