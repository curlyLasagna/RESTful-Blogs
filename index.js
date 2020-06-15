const 
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    express         = require("express"),
    app             = express();

mongoose.connect("mongodb://localhost/restful_blog");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// Mongoose/Model config
let 
    blogSchema = new mongoose.Schema({
        title: String,
        image: {type: String, default: "place_holder.jpg"},
        body: String,
        // You can set a default value
        created: {
                type: Date, 
                default: Date.now}
    }),
    Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
    // title: "Why staggered keyboards and wrist strain",
    // image: "https://i.imgur.com/p8FOe36.jpg",
    // body: "Staggered keyboards are based off typewriters. Typewriters had a layout as such due to their mechanical limitations. It doesn't really encourage best practices when typing on a keyboard."
// });
// Index route
app.get("/blogs", (req, res)=>{
    Blog.find({}, (err, blogs)=>{
        (err) ?
        console.log(err) :
        res.render("index", {blogs: blogs});
    })
})

// New route
app.get("/blogs/new", (req, res)=>{
    res.render("new");
})

// Create route
app.post("/blogs", (req, res)=>{
    Blog.create(req.body.blog, (err, newBlog)=>{
        (err) ?
            res.render("new") :
            res.redirect("/blogs");
    })
})

app.get("/", (req, res)=>{
    res.redirect("/blogs")
})

app.get("*", (req, res)=>{
    res.send("This site is still under construction");
})

// RESTful routes
app.listen(3000, ()=>{
    console.log("Blog app started");
})