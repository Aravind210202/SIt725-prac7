let collection;

function setCollection(dbCollection) {
    collection = dbCollection;
}

async function postCard(card) {
    try {
        await collection.insertOne(card);
        console.log('Card added successfully');
    } catch (err) {
        console.error('Error adding card:', err);
        throw err;
    }
}

async function getAllCards() {
    try {
        const cards = await collection.find({}).toArray();
        return cards;
    } catch (err) {
        console.error('Error fetching cards:', err);
        throw err;
    }
}

module.exports = { setCollection, postCard, getAllCards };