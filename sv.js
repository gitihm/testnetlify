let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();
app.use(cors());

app.use('/api', bodyParser.json(), router);   
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let bears = [{'id':0,'name':'pooh','weight': 211},
   {'id':1, 'name':'vinnie','weight': 111}
];
let std = [ {'id':5935512001,'name':'Somchai','surname':'Khemklad','Major':'CoE','GPA':3.32},
            {'id':5935512002,'name':'Somchai','surname':'Khemklad','Major':'CoE','GPA':3.32}]

router.route('/bears')
    .get((req, res) =>  res.json(std) )

    .post( (req, res)=> {
        var Newstd = {};
        Newstd.id = req.body.id  
        Newstd.name = req.body.name; 
        Newstd.surname = req.body.surname;  
        Newstd.GPA = req.body.GPA; 
        std.push(Newstd)
        res.json( {message: 'std created!'} )
    })
 
router.route('/bears/:id')
    .get ( (req,res) => res.json(std[req.params.id-1]))  // get a bear

    .put ( (req,res) => { 
        let index = std.findIndex((item)=>{
            return item.id == req.param.id
        })
        console.log("index :"+index)
        std[index].id = req.body.id; 
        std[index].name = req.body.name;  
        std[index].surname = req.body.surname;   
        std[index].GPA = req.body.GPA;  
        res.json({ message: 'std updated!' + req.params.id});
        console.log(err)
    })

    .delete ( (req,res) => {   
        let tmp = std.filter((item)=>{
            return item.id != req.params.id
        })
        std = tmp;
        // delete  std[tmp]
        res.json({ message: 'std deleted: ' + req.params.id});
    })

app.use("*", (req,res) => res.status(404).send('404 Not found') );
app.listen(80,()=>{
    console.log("RUNNING")
})
