const { pool } = require("../connect");
const { tryCatchWrapper } = require("../tryCatchWrapper");


const getProducts = tryCatchWrapper(async function (req, res, next) {
    let paginatedProducts = await getProductsFromMysql(req);
    return res.status(200).json( {data: paginatedProducts, totalProducts: 250});
});

const getProductsTable = tryCatchWrapper(async function (req, res, next) {
    let paginatedProducts = await getProductsFromMysql(req);
    return res.status(200).json( {data: paginatedProducts, totalProducts: 250} );
});

const getProductsFromMysql = async function (req){
    const pageSize = req.query.perPage ? parseInt(req.query.perPage) : 0;
    const page = req.query.page ? parseInt(req.query.page) + 1 : 0;
    let sql = 
    "SELECT PRODUCTS.ID as id, PRODUCTS.CATALOG_NUMBER, PRODUCTS.NAME, PRODUCTS.PACK_SIZE, PRODUCT_PRICES.PRICE " + 
    " from PRODUCTS LEFT JOIN PRODUCT_PRICES ON PRODUCT_PRICES.ID_PRODUCT = PRODUCTS.ID " + 
    "WHERE PRODUCTS.DELETED = 0 AND PRODUCTS.ENABLED = 1 AND PRODUCTS.LIST_ON_WEB = 1 AND PRODUCTS.IS_MASTER = 0 AND PRODUCT_PRICES.END_DATE is NULL ";
    const [rows] = await pool.query(sql);
    if (!rows.length) return res.status(204).json({ message: "empty list" });
    let paginatedProducts = rows
    if (pageSize !== 0 && page !== 0) {
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        paginatedProducts = rows.slice(startIndex, endIndex);
    }
    return paginatedProducts
};

const getProduct = tryCatchWrapper(async function (req, res, next){
    const id = req.params.id;
    let sql = "SELECT * from PRODUCTS WHERE ID = " + id + " LIMIT 1";
    const [row] = await pool.query(sql);
    if (Object.keys(row).length === 0) return res.status(204).json({ message: "empty list" });

    return res.status(200).json( row[0] );

})

const  editProduct = tryCatchWrapper(async function (req, res, next){
    const body = req.body;
    const category_id = body.CATEGORY_ID.id;
    let sql = "UPDATE PRODUCTS SET SEARCH_KEYWORDS = '" + body.SEARCH_KEYWORDS + "', NAME = '" + body.NAME
        + "', DESCRIPTION = '" + body.DESCRIPTION + "', CATEGORY_ID = " + category_id + " WHERE ID = " + body.ID;
    const results = await pool.query(sql);
    if (results[0] && results[0].affectedRows > 0) {
        // Update was successful
        res.status(200).send('Update successful');
    } else {
        // No rows were affected, which means the update did not match any records
        res.status(404).send('No matching records found for the update');
    }
})

module.exports = {
    getProducts, getProduct, getProductsTable, editProduct
};