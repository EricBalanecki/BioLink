const { pool } = require("../connect");
const { tryCatchWrapper } = require("../tryCatchWrapper");


const getOrders = tryCatchWrapper(async function (req, res, next) {
    let paginatedOrders = await getOrdersFromMysql(req);
    res.setHeader('Content-Type', 'application/json')
    return res.status(200).json( paginatedOrders );
});

const getOrdersFromMysql = async function (req){
    const pageSize = req.query.perPage ? parseInt(req.query.perPage) : 0;
    const page = req.query.page ? parseInt(req.query.page) + 1 : 0;
    let sql = "SELECT * from oOrders WHERE cancelled = 0 AND deleted = 0";
    const [rows] = await pool.query(sql);
    if (!rows.length) return res.status(204).json({ message: "empty list" });
    let paginatedProducts = rows
    let total = rows.length
    if (pageSize !== 0 && page !== 0) {
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        paginatedProducts = rows.slice(startIndex, endIndex);
    }
    let res = {data: paginatedProducts, total: total}
    return res
};

const createOrder = tryCatchWrapper(async function (req, res, next) {

});

const getNewOrders = tryCatchWrapper(async function(req, res, next) {
    let sql = "SELECT * from oOrders where shipping_date = '0000-00-00' AND shipping_date_actual = '0000-00-00 00:00:00' AND is_back_order = 0 AND cancelled = 0 AND deleted = 0 AND invoice_number is NULL";
    let orders = runQuery(sql);
    res.setHeader('Content-Type', 'application/json')
    if (!orders.length) return res.status(204).json({ message: "empty list" });
    return res.status(200).json( orders );

});


const getUnverifiedOrders = tryCatchWrapper(async function(req, res, next) {
    let sql = "SELECT * from oOrders where shipping_date = '0000-00-00' AND shipping_date_actual = '0000-00-00 00:00:00' AND is_back_order = 0 AND cancelled = 0 AND deleted = 0";
    const [orders] = await pool.query(sql);
    console.log(orders.length)
    res.setHeader('Content-Type', 'application/json')
    if (!orders.length) return res.status(204).json({ message: "empty list" });
    return res.status(200).json( orders );

});

const getBackOrder = tryCatchWrapper(async function(req, res, next) {
    let sql = "SELECT * from oOrders where shipping_date = '0000-00-00' AND shipping_date_actual = '0000-00-00 00:00:00' AND is_back_order = 1 AND cancelled = 0 AND deleted = 0";
    const [orders] = await pool.query(sql);
    console.log(orders.length)
    res.setHeader('Content-Type', 'application/json')
    if (!orders.length) return res.status(204).json({ message: "empty list" });
    return res.status(200).json( orders );

});




module.exports = {
    getOrders,
    createOrder,
    getNewOrders,
    getUnverifiedOrders
};