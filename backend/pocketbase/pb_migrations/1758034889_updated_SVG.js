/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2596568427")

  // add field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "json54863248",
    "maxSize": 0,
    "name": "svg",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text4286007220",
    "max": 0,
    "min": 0,
    "name": "titre",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2596568427")

  // remove field
  collection.fields.removeById("json54863248")

  // remove field
  collection.fields.removeById("text4286007220")

  return app.save(collection)
})
