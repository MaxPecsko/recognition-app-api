const handleHistory = db => (req, res) => {
    const { user_id } = req.params;

    db("history").where('id', id).then(historyData => {
        
    });
};

