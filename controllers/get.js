exports.get = async (req,res)=> {
    try {
        res.json("hello world")
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error Creating tables"})
        
    }
}
