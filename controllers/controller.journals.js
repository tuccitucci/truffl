'use strict'

var Journal = require('../models/model.journal');
var request = require('request-promise');
var _ = require('lodash');

function getMeasures(food) {
  return _(food.nutrients)
    .reduce(function(res, item) {
      if (!_.find(res, {label: item.measures[0].label})) {
        res.push(item.measures[0]);
      }
      return res;
    }, [])
}

function serializeFood(f) {
  f.totals = {};
  f.measures = getMeasures(f)[0];

  f.nutrients.forEach(function(nutrient,index) {
    f.totals[nutrient.name] = [0, ''];
    // getting calories
    if(nutrient.name === "Energy" && nutrient.unit === "kcal"){
      console.log("Calories are: ", nutrient.measures[0].value);
    }

    f.totals[nutrient.name][0] += nutrient.value;
    f.totals[nutrient.name][1] = nutrient.unit;

    if (f.measures.customQty) {
      var singleServingAmount = nutrient.value / f.measures.qty;
      f.totals[nutrient.name][0] = Math.ceil(singleServingAmount*f.measures.customQty);
    }
  });
  return f.totals;
}

function create (req,res) {
    if(req.body.data.ndbno) {
      return getFoodById_USDA(req.body.data.ndbno)
        .then((response) => {
          var serializedFood = {};
          serializedFood.nutrients = serializeFood(response.report.food);
          serializedFood.name = response.report.food.name;
          serializedFood.ndbno = response.report.food.ndbno;
          serializedFood.user = req.session.uid;
          serializedFood.date = req.body.data.date || new Date();
          var newDoc = new Journal(serializedFood);
          newDoc.save((err, doc) => {
              if(err) {
                  return res.send(err);
              }
              console.log(doc)
              return res.send(doc);
          });
        });
    }
};

function getFoodById_USDA(ndbno) {
    var params = {
      format: 'json',
      max: '10',
      offset: '0',
      type: 'f',
      ndbno: ndbno,
      api_key: 'rylOA6sKtXOLBEMUbJmvsSv7LtGfuZkEFcYOi0jd'
    };

    var url = "http://api.nal.usda.gov/ndb/reports/";

    console.log(params)
    return request({url: url, qs: params, json: true});
}

function totalOutJournal(list) {
  return _.reduce(list, function(res, item) {
    _.map(item.nutrients, function(val, key) {
      if (_.isArray(val) && val.length) {
        res[key] = res[key] || [0, ''];
        res[key][0] += parseFloat(val[0]);
        res[key][1] = val[1];
      }
    });
    return res;
  }, {});
}

function get (req,res) {
    Journal.find({user: req.session.uid }, (err, docs) => {
        if(err) {
          res.send(err);
        } else {
          var totals = totalOutJournal(docs);

          res.send({
            list: docs,
            totals: totals
          });
        }
    });
};

function remove (req,res) {
  console.log(req.body._id)
    Journal.remove({_id: req.body._id }, (err) => {
        if(err) {
          res.send(err);
        } else {
          res.send("Success Removing Food!")
        }
    });
};

module.exports = {
    create : create,
    get : get,
    remove : remove,
};
