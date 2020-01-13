const getUsersHistory = db => (req, res) => {
  const { user_id } = req.params;

  if (!user_id) res.status(422).json({ err: "User id was not presented." });

  db("history")
    .where({ user_id })
    .orderBy("created_at", "desc")
    .then(historyData => res.json(historyData[0]))
    .catch(err => res.status(500).json({ err: "Unexpected error." }));
};

const postUsersHistory = db => async (req, res) => {
  const { user_id } = req.params;
  const { bounding_boxes, img_url } = req.body;

  try {
    await db.insert({ user_id, bounding_boxes, img_url });
    return res.json({ message: "Success" });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

module.exports = {
  getUsersHistory,
  postUsersHistory
};
