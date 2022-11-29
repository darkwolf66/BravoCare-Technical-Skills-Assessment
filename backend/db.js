class Database {
    static async connect() {
        if (global.connection)
            return global.connection.connect();

        const {Pool} = require('pg');
        const pool = new Pool({
            connectionString: 'postgres://postgres:%401nVAin@127.0.0.1:5432/bravocare'
        });
        pool.on('error', (err, client) => {
            console.error('Unexpected error on idle client', err)
        })
        global.connection = pool;
        return pool.connect();
    }

    static async getQuestionOneShifts() {
        const client = await Database.connect();
        const res = await client.query('SELECT * FROM question_one_shifts inner join facilities f on question_one_shifts.facility_id = f.facility_id;');
        client.release();
        return res.rows;
    }
    static async getQuestionOneShiftId(id) {
        const client = await Database.connect();
        const res = await client.query('SELECT * FROM question_one_shifts WHERE shift_id = $1', [id]);
        client.release();
        return res.rows;
    }
    static async getNurses(){
        const client = await Database.connect();
        const res = await client.query('SELECT * FROM nurses');
        client.release();
        return res.rows;
    }
    static async getFacilities(){
        const client = await Database.connect();
        const res = await client.query('SELECT * FROM facilities');
        client.release();
        return res.rows;
    }
    static async getJobs(){
        const client = await Database.connect();
        const res = await client.query('SELECT * FROM jobs');
        client.release();
        return res.rows;
    }
    static async getNursesJobs(){
        const client = await Database.connect();
        const res = await client.query('SELECT * FROM nurse_hired_jobs');
        client.release();
        return res.rows;
    }
    static async queryFour(){
        const client = await Database.connect();
        const res = await client.query('SELECT\n' +
            'f.facility_name,\n' +
            '    j.nurse_type_needed,\n' +
            'SUM(j.total_number_nurses_needed) - COUNT(nj.nurse_id) total_number_of_jobs_left\n' +
            'FROM jobs j\n' +
            'INNER JOIN facilities f\n' +
            'ON f.facility_id = j.facility_id\n' +
            'INNER JOIN nurse_hired_jobs nj\n' +
            'ON nj.job_id = j.job_id\n' +
            'GROUP BY\n' +
            'f.facility_id,\n' +
            '    f.facility_name,\n' +
            '    j.nurse_type_needed;');
        client.release();
        return res.rows;
    }
    static async queryFive() {
        const client = await Database.connect();
        const res = await client.query('WITH jobs_available as (SELECT\n' +
            '    j.job_id as job_id,\n' +
            '\tf.facility_name,\n' +
            '\tj.nurse_type_needed,\n' +
            '\tSUM(j.total_number_nurses_needed) - COUNT(nj.nurse_id) total_number_of_jobs_left\n' +
            'FROM jobs j\n' +
            'INNER JOIN facilities f\n' +
            '\tON f.facility_id = j.facility_id\n' +
            'INNER JOIN nurse_hired_jobs nj\n' +
            '\tON nj.job_id = j.job_id\n' +
            'GROUP BY\n' +
            '    j.job_id,\n' +
            '\tf.facility_id,\n' +
            '\tf.facility_name,\n' +
            '\tj.nurse_type_needed)\n' +
            '\n' +
            'select\n' +
            '       n.nurse_id as nurse_id,\n' +
            '       n.nurse_type as nurse_type,\n' +
            '        (select count(*)\n' +
            '            from jobs\n' +
            '            inner join nurse_hired_jobs nhj on jobs.job_id = nhj.job_id\n' +
            '            inner join jobs_available jb on jobs.job_id = jb.job_id\n' +
            '            where jobs.nurse_type_needed = n.nurse_type and nurse_id != n.nurse_id and total_number_of_jobs_left > 0) as available_jobs\n' +
            'from nurses as n\n' +
            'order by nurse_id;\n');
        client.release();
        return res.rows;
    }
    static async querySix(){
        const client = await Database.connect();
        const res = await client.query('select *\n' +
            'from nurses\n' +
            'inner join nurse_hired_jobs nhj on nurses.nurse_id = nhj.nurse_id\n' +
            'inner join jobs j on nhj.job_id = j.job_id\n' +
            'where facility_id = (select facility_id\n' +
            'from nurses\n' +
            'inner join nurse_hired_jobs nhj on nurses.nurse_id = nhj.nurse_id\n' +
            'inner join jobs j on nhj.job_id = j.job_id\n' +
            'where nurse_name = \'Anne\') and nurse_name <> \'Anne\';');
        client.release();
        return res.rows;
    }
}
module.exports = Database