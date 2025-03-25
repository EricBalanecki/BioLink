const { pool } = require("../connect");
const { tryCatchWrapper } = require("../tryCatchWrapper");


const getCategories = tryCatchWrapper(async function (req, res, next) {
    let sql = "SELECT * from CATEGORIES WHERE ENABLED = 1 AND MASTER != 0";
    sql += (req.query && req.query.id) ? (" AND ID = " + req.query.id) : '';
    console.log(sql);
    const [rows] = await pool.query(sql);
    if (!rows.length) return res.status(204).json({ message: "empty list" });
    let categoryArr = getData(rows);
    return res.status(200).json( categoryArr );
});

const getCategory = tryCatchWrapper(async  function(req, res, next){
    let id = req.params.id;
    let sql = "SELECT ID, NAME FROM CATEGORIES WHERE ID = " + id;
    const [rows] = await pool.query(sql);
    let categoryArr = getData(rows);
    return res.status(200).json(categoryArr);
});

const getData = function (rows) {
    let categoryArr = [];
    rows.forEach((element) =>{
        let category = {};
        category['label'] = element['NAME'];
        category['id'] = element['ID'];
        categoryArr.push(category);
    })
    return categoryArr;
}

module.exports = {
    getCategories, getCategory
};