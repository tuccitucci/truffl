'use strict'

var Journal = require('../models/model.journal');
var request = require('request-promise');
var moment = require('moment');
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

// function serializeFood(f) {
//   f.totals = {};
//   f.measures = getMeasures(f)[0];
//
//   f.nutrients.forEach(function(nutrient,index) {
//     f.totals[nutrient.name] = [0, ''];
//     // getting calories
//     if(nutrient.name === "Energy" && nutrient.unit === "kcal") {
//       console.log("Calories are: ", nutrient.measures[0].value);
//     }
//
//     f.totals[nutrient.name][0] += nutrient.value;
//     f.totals[nutrient.name][1] = nutrient.unit;
//
//     if (f.measures.customQty) {
//       var singleServingAmount = nutrient.value / f.measures.qty;
//       f.totals[nutrient.name][0] = Math.ceil(singleServingAmount*f.measures.customQty);
//     }
//   });
//   return f.totals;
// }

function serializeFood(f, customQty) {
  var nutr = f.nutrients || f;
  customQty = customQty || 1;

  var done = {
    'Water': [_.find(nutr, {name: 'Water'}).value * customQty, _.find(nutr, {name: 'Water'}).unit],
    'Energy': [_.find(nutr, {name: 'Energy'}).value * customQty, _.find(nutr, {name: 'Energy'}).unit],
    'Protein': [_.find(nutr, {name: 'Protein'}).value * customQty, _.find(nutr, {name: 'Protein'}).unit],
    'Alcohol, ethyl': [_.find(nutr, {name: 'Alcohol, ethyl'}).value * customQty, _.find(nutr, {name: 'Alcohol, ethyl'}).unit],
    'Caffeine': [_.find(nutr, {name: 'Caffeine'}).value * customQty, _.find(nutr, {name: 'Caffeine'}).unit],
    'Carbohydrate': [_.find(nutr, {name: 'Carbohydrate, by difference'}).value * customQty, _.find(nutr, {name: 'Carbohydrate, by difference'}).unit],
    'Fat': [_.find(nutr, {name: 'Total lipid (fat)'}).value * customQty, _.find(nutr, {name: 'Total lipid (fat)'}).unit],

    'fats': {
      'Total lipid (fat)': [_.find(nutr, {name: 'Total lipid (fat)'}).value * customQty, _.find(nutr, {name: 'Total lipid (fat)'}).unit],
      'Fatty acids, total saturated': [_.find(nutr, {name: 'Fatty acids, total saturated'}).value * customQty, _.find(nutr, {name: 'Fatty acids, total saturated'}).unit],
      'Fatty acids, total monounsaturated': [_.find(nutr, {name: 'Fatty acids, total monounsaturated'}).value * customQty, _.find(nutr, {name: 'Fatty acids, total monounsaturated'}).unit],
      'Fatty acids, total polyunsaturated': [_.find(nutr, {name: 'Fatty acids, total polyunsaturated'}).value * customQty, _.find(nutr, {name: 'Fatty acids, total polyunsaturated'}).unit],
      '20:5 n-3 (EPA)': [_.find(nutr, {name: '20:5 n-3 (EPA)'}).value * customQty, _.find(nutr, {name: '20:5 n-3 (EPA)'}).unit],
      '22:5 n-3 (DPA)': [_.find(nutr, {name: '22:5 n-3 (DPA)'}).value * customQty, _.find(nutr, {name: '22:5 n-3 (DPA)'}).unit],
      '22:6 n-3 (DHA)': [_.find(nutr, {name: '22:6 n-3 (DHA)'}).value * customQty, _.find(nutr, {name: '22:6 n-3 (DHA)'}).unit],
      'Cholesterol': [_.find(nutr, {name: 'Cholesterol'}).value * customQty, _.find(nutr, {name: 'Cholesterol'}).unit],
    },

    'carbs': {
      'Carbohydrate, by difference': [_.find(nutr, {name: 'Carbohydrate, by difference'}).value * customQty, _.find(nutr, {name: 'Carbohydrate, by difference'}).unit],
      'Fiber, total dietary': [_.find(nutr, {name: 'Fiber, total dietary'}).value * customQty, _.find(nutr, {name: 'Fiber, total dietary'}).unit],
      'Sugars, total': [_.find(nutr, {name: 'Sugars, total'}).value * customQty, _.find(nutr, {name: 'Sugars, total'}).unit],
    },

    'minerals': {
      'Calcium, Ca': [_.find(nutr, {name: 'Calcium, Ca'}).value * customQty, _.find(nutr, {name: 'Calcium, Ca'}).unit],
      'Iron, Fe': [_.find(nutr, {name: 'Iron, Fe'}).value * customQty, _.find(nutr, {name: 'Iron, Fe'}).unit],
      'Magnesium, Mg': [_.find(nutr, {name: 'Magnesium, Mg'}).value * customQty, _.find(nutr, {name: 'Magnesium, Mg'}).unit],
      'Phosphorus, P': [_.find(nutr, {name: 'Phosphorus, P'}).value * customQty, _.find(nutr, {name: 'Phosphorus, P'}).unit],
      'Potassium, K': [_.find(nutr, {name: 'Potassium, K'}).value * customQty, _.find(nutr, {name: 'Potassium, K'}).unit],
      'Sodium, Na': [_.find(nutr, {name: 'Sodium, Na'}).value * customQty, _.find(nutr, {name: 'Sodium, Na'}).unit],
      'Zinc, Zn': [_.find(nutr, {name: 'Zinc, Zn'}).value * customQty, _.find(nutr, {name: 'Zinc, Zn'}).unit],
      'Copper, Cu': [_.find(nutr, {name: 'Copper, Cu'}).value * customQty, _.find(nutr, {name: 'Copper, Cu'}).unit],
      'Selenium, Se': [_.find(nutr, {name: 'Selenium, Se'}).value * customQty, _.find(nutr, {name: 'Selenium, Se'}).unit],
    },

    'vitamins': {
      'Vitamin A, IU': [_.find(nutr, {name: 'Vitamin A, IU'}).value * customQty, _.find(nutr, {name: 'Vitamin A, IU'}).unit],
      'Thiamin': [_.find(nutr, {name: 'Thiamin'}).value * customQty, _.find(nutr, {name: 'Thiamin'}).unit],
      'Riboflavin': [_.find(nutr, {name: 'Riboflavin'}).value * customQty, _.find(nutr, {name: 'Riboflavin'}).unit],
      'Vitamin B-12': [_.find(nutr, {name: 'Vitamin B-12'}).value * customQty, _.find(nutr, {name: 'Vitamin B-12'}).unit],
      'Vitamin B-6': [_.find(nutr, {name: 'Vitamin B-6'}).value * customQty, _.find(nutr, {name: 'Vitamin B-6'}).unit],
      'Niacin': [_.find(nutr, {name: 'Niacin'}).value * customQty, _.find(nutr, {name: 'Niacin'}).unit],
      'Folate, total': [_.find(nutr, {name: 'Folate, total'}).value * customQty, _.find(nutr, {name: 'Folate, total'}).unit],
      'Vitamin C, total ascorbic acid': [_.find(nutr, {name: 'Vitamin C, total ascorbic acid'}).value * customQty, _.find(nutr, {name: 'Vitamin C, total ascorbic acid'}).unit],
      'Vitamin E (alpha-tocopherol)': [_.find(nutr, {name: 'Vitamin E (alpha-tocopherol)'}).value * customQty, _.find(nutr, {name: 'Vitamin E (alpha-tocopherol)'}).unit],
      'Vitamin D': [_.find(nutr, {name: 'Vitamin D'}).value * customQty, _.find(nutr, {name: 'Vitamin D'}).unit]
    }
  }

  return done;
}

function create (req,res) {
    if(req.body.data.ndbno) {
      return getFoodById_USDA(req.body.data.ndbno)
        .then((response) => {
          var serializedFood = {};
          serializedFood.nutrients = serializeFood(response.report.food, req.body.data.customQty);
          serializedFood.name = response.report.food.name;
          serializedFood.ndbno = response.report.food.ndbno;
          serializedFood.user = req.session.uid;
          serializedFood.date = req.body.data.date || new Date();
          var newDoc = new Journal(serializedFood);
          newDoc.save((err, doc) => {
              if(err) {
                  return res.send(err);
              }
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

    return request({url: url, qs: params, json: true});
}

function totalOutJournal(list) {
  var totals = _.reduce(list, function(res, item) {
    _.map(item.nutrients, function(val, key) {
      if (_.isArray(val) && val.length) {
        res[key] = res[key] || [0, ''];
        res[key][0] += parseFloat(val[0]);
        res[key][1] = val[1];
      }
      if (['fats', 'minerals', 'vitamins', 'carbs'].indexOf(key) >= 0) {
        res[key] = res[key] || {};
        _.forEach(val, function(innerVal, innerKey) {
          if (_.isArray(innerVal) && innerVal.length) {
            res[key][innerKey] = res[key][innerKey] || [0, ''];
            res[key][innerKey][0] += parseFloat(innerVal[0]);
            res[key][innerKey][1] = innerVal[1];
          }
        });
      }
    });
    return res;
  }, {});

  return totals;
}

function constructDateRange(start, end) {
  var range = {};

  if (start && end) {

    end = moment(end).add(1, 'days').toDate();
    start = moment(start).toDate();

    range = {
      date: {
        $gte: start,
        $lte: end
      }
    }

  }

  return range;
}

// DATE RANGE: api/journal?startDate=2016-11-01&endDate=2016-11-25

function get (req,res) {
    var range = constructDateRange(req.query.startDate, req.query.endDate);
    var user = {user: req.session.uid };
    var params = _.extend(user, range);
    Journal.find(params, (err, docs) => {
        if(err) {
          res.send(err);
        } else {
          var totals = totalOutJournal(docs);

          res.send({
            count: docs.length,
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
