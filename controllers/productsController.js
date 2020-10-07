const fs=require('fs')
const path = require('path');
const dbProducts = require (path.join(__dirname,'..','data', 'dbProducts'))
const dbCategorias = require (path.join(__dirname,'..','data', 'dbCategorias'))


module.exports ={
    listar:function(req,res) {
        res.render('products',{
            title: "Productos",
            css:"index.css",
            productos: dbProducts
        })
    },
    detalle:function(req,res) {
        idProducto= req.params.id;
        let producto = dbProducts.filter(producto => {
            return producto.id == idProducto
        });
        res.render('productDetail',{
            title:'Detalle del producto',
            css:'products.css',
            producto:producto[0],
        })
    },
    search:function(req,res) {
        let busqueda= req.query.search;
        let productos=[];
        dbProducts.forEach(producto => {
            // .includes() es para cuando encuentra una palabra similar a lo que viene por busqueda no hace falta ponerle todo el nombre(ej. televisor lg 32'p con poner televisor esta bien)
            if(producto.name.toLowerCase().includes(busqueda.toLowerCase())){
                productos.push(producto)
            }
        });
        res.render('products',{
            title: "Resultado de la busqueda",
            css:"index.css",
            productos:productos,
        });
    },
    agregar: (req , res)=>{
        let categoria;
        let sub;
        if(req.query.categoria){
            categoria = req.query.categoria;
            sub = req.query.sub;
        }
        res.render('addProduct',{
            title: "Formulario de Carga",
            css:"products.css",
            categorias:dbCategorias,
            categoria:categoria,
            sub:sub,
        })
    },
    publicar:(req,res)=>{
        let lastID = 1;
        dbProducts.forEach(producto=>{
            if(producto.id > lastID){
                lastID = producto.id
            }
        })
        let newProduct = {
            id:lastID +1,
            name: req.body.name.trim(),
            price: Number(req.body.price),
            discount:Number(req.body.discount),
            category:req.body.category.trim(),
            description:req.body.description.trim(),
            image: (req.files[0])?req.files[0].filename:"default-image.png"
        }
        dbProducts.push(newProduct);
        fs.writeFileSync(path.join(__dirname,"..","data","productsDataBase.json"),JSON.stringify(dbProducts),'utf-8')
        res.redirect('/products')
    },
    show:(req,res)=>{
        let idProducto = req.params.id;
        
        let flap = req.params.flap;
        let activeDetail;
        let activeEdit;
        let showDetail;
        let showEdit;

        if(flap == "show"){
            activeDetail = "active";
            showDetail = "show";
        }else{
            activeEdit = "active";
            showEdit = "show";
        }

        let resultado = dbProducts.filter(producto =>{
            return producto.id == idProducto
        })

        res.render('productShow',{
            title: "Ver / Editar Producto",
            css: 'products.css',
            total: dbProducts.length,
            categorias:dbCategorias,
            producto: resultado[0],
            activeDetail:activeDetail,
            activeEdit:activeEdit,
            showEdit:showEdit,
            showDetail:showDetail
        })

    },
    editar:function(req,res){

        let idProducto = req.body.id;

        dbProducts.forEach(producto =>{
            if(producto.id == idProducto){
                producto.id = Number(req.body.id),
                producto.name = req.body.name.trim(),
                producto.price = Number(req.body.price),
                producto.discount = Number(req.body.discount),
                producto.category = req.body.category.trim(),
                producto.description = req.body.description.trim(),
                producto.image = (req.files[0])?req.files[0].filename:'producto.image'
            }
        })
        fs.writeFileSync(path.join(__dirname,'../data/productsDataBase.json'),JSON.stringify(dbProducts),'utf-8');
        res.redirect('/products/show/'+ idProducto + '/show')
    }
}