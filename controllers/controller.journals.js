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

function serializeFood(f, customQty) {
  var nutr = f.nutrients || f;
  customQty = customQty || 1;

  var done = {
    'Water': [_.find(nutr, {name: 'Water'}).value * customQty, _.find(nutr, {name: 'Water'}).unit],
    'Energy': [_.find(nutr, {name: 'Energy'}).value * customQty, _.find(nutr, {name: 'Energy'}).unit],
    'Protein': [_.find(nutr, {name: 'Protein'}).value * customQty, _.find(nutr, {name: 'Protein'}).unit],
    'Caffeine': _.find(nutr, {name: 'Caffeine'}) ? [_.find(nutr, {name: 'Caffeine'}).value * customQty, _.find(nutr, {name: 'Caffeine'}).unit] : [],
    'Carbohydrate': [_.find(nutr, {name: 'Carbohydrate, by difference'}).value * customQty, _.find(nutr, {name: 'Carbohydrate, by difference'}).unit],
    'Fat': [_.find(nutr, {name: 'Total lipid (fat)'}).value * customQty, _.find(nutr, {name: 'Total lipid (fat)'}).unit],

    'fats': {
      'Total lipid (fat)': [_.find(nutr, {name: 'Total lipid (fat)'}).value * customQty, _.find(nutr, {name: 'Total lipid (fat)'}).unit],
      'Fatty acids, total saturated': [_.find(nutr, {name: 'Fatty acids, total saturated'}).value * customQty, _.find(nutr, {name: 'Fatty acids, total saturated'}).unit],
      'Fatty acids, total monounsaturated': [_.find(nutr, {name: 'Fatty acids, total monounsaturated'}).value * customQty, _.find(nutr, {name: 'Fatty acids, total monounsaturated'}).unit],
      'Fatty acids, total polyunsaturated': [_.find(nutr, {name: 'Fatty acids, total polyunsaturated'}).value * customQty, _.find(nutr, {name: 'Fatty acids, total polyunsaturated'}).unit],
      '20:5 n-3 (EPA)': _.find(nutr, {name: '20:5 n-3 (EPA)'}) ? [_.find(nutr, {name: '20:5 n-3 (EPA)'}).value * customQty, _.find(nutr, {name: '20:5 n-3 (EPA)'}).unit] : [],
      '22:5 n-3 (DPA)': _.find(nutr, {name: '22:5 n-3 (DPA)'}) ? [_.find(nutr, {name: '22:5 n-3 (DPA)'}).value * customQty, _.find(nutr, {name: '22:5 n-3 (DPA)'}).unit] : [],
      '22:6 n-3 (DHA)': _.find(nutr, {name: '22:6 n-3 (DHA)'}) ? [_.find(nutr, {name: '22:6 n-3 (DHA)'}).value * customQty, _.find(nutr, {name: '22:6 n-3 (DHA)'}).unit]: [],
      'Cholesterol': [_.find(nutr, {name: 'Cholesterol'}).value * customQty, _.find(nutr, {name: 'Cholesterol'}).unit],
    },

    'carbs': {
      'Carbohydrate, by difference': [_.find(nutr, {name: 'Carbohydrate, by difference'}).value * customQty, _.find(nutr, {name: 'Carbohydrate, by difference'}).unit],
      'Fiber, total dietary': _.find(nutr, {name: 'Fiber, total dietary'}) ? [_.find(nutr, {name: 'Fiber, total dietary'}).value * customQty, _.find(nutr, {name: 'Fiber, total dietary'}).unit] : [],
      'Sugars, total': _.find(nutr, {name: 'Sugars, total'}) ? [_.find(nutr, {name: 'Sugars, total'}).value * customQty, _.find(nutr, {name: 'Sugars, total'}).unit] : [],
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
      'Selenium, Se': _.find(nutr, {name: 'Selenium, Se'}) ? [_.find(nutr, {name: 'Selenium, Se'}).value * customQty, _.find(nutr, {name: 'Selenium, Se'}).unit] : [],
    },

    'vitamins': {
      'Vitamin A, IU': [_.find(nutr, {name: 'Vitamin A, IU'}).value * customQty, _.find(nutr, {name: 'Vitamin A, IU'}).unit],
      'Thiamin': [_.find(nutr, {name: 'Thiamin'}).value * customQty, _.find(nutr, {name: 'Thiamin'}).unit],
      'Riboflavin': [_.find(nutr, {name: 'Riboflavin'}).value * customQty, _.find(nutr, {name: 'Riboflavin'}).unit],
      'Vitamin B-12': [_.find(nutr, {name: 'Vitamin B-12'}).value * customQty, _.find(nutr, {name: 'Vitamin B-12'}).unit],
      'Vitamin B-6': _.find(nutr, {name: 'Vitamin B-6'}) ? [_.find(nutr, {name: 'Vitamin B-6'}).value * customQty, _.find(nutr, {name: 'Vitamin B-6'}).unit] : [],
      'Niacin': [_.find(nutr, {name: 'Niacin'}).value * customQty, _.find(nutr, {name: 'Niacin'}).unit],
      'Folate, total': [_.find(nutr, {name: 'Folate, total'}).value * customQty, _.find(nutr, {name: 'Folate, total'}).unit],
      'Vitamin C, total ascorbic acid': [_.find(nutr, {name: 'Vitamin C, total ascorbic acid'}).value * customQty, _.find(nutr, {name: 'Vitamin C, total ascorbic acid'}).unit],
      'Vitamin E (alpha-tocopherol)': _.find(nutr, {name: 'Vitamin E (alpha-tocopherol)'}) ? [_.find(nutr, {name: 'Vitamin E (alpha-tocopherol)'}).value * customQty, _.find(nutr, {name: 'Vitamin E (alpha-tocopherol)'}).unit] : [],
      'Vitamin D': _.find(nutr, {name: 'Vitamin E (alpha-tocopherol)'}) ? [_.find(nutr, {name: 'Vitamin D'}).value * customQty, _.find(nutr, {name: 'Vitamin D'}).unit] : []
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

function lowestNutrientPerCat(list) {
  var calced = _.reduce(list, function(result, item, key) {
    var obj = {};
    obj[key] = item[0]/100;
    result.push(obj);
    return result;
  }, [])

  return _.minBy(calced, function(o) {
    return o[_(o).keys().first()]
  })
}

function makeASuggestion(list) {
  var nutrientAllowances = {
    'Water': 600,
    'Energy': 2000,
    'Protein': 80,
    'Alcohol, ethyl': 0,
    'Caffeine': 210,
    'Carbohydrate': 210,
    'Fat': 65,

    'Total lipid (fat)': 65,
    'Fatty acids, total saturated': 20,
    'Fatty acids, total monounsaturated': 20,
    'Fatty acids, total polyunsaturated': 20,
    '20:5 n-3 (EPA)': 200,
    '22:5 n-3 (DPA)': 200,
    '22:6 n-3 (DHA)': 200,
    'Cholesterol': 300,

    'Carbohydrate, by difference': 300,
    'Fiber, total dietary': 25,
    'Sugars, total': 20,

    'Calcium, Ca': 1000,
    'Iron, Fe': 18,
    'Magnesium, Mg': 400,
    'Phosphorus, P': 1000,
    'Potassium, K':3500,
    'Sodium, Na': 2400,
    'Zinc, Zn': 15,
    'Copper, Cu': 2,
    'Selenium, Se': 70,

    'Vitamin A, IU': 5000,
    'Thiamin': 1.5,
    'Riboflavin': 1.7,
    'Vitamin B-12': 6,
    'Vitamin B-6': 2,
    'Niacin': 20,
    'Folate, total': 400,
    'Vitamin C, total ascorbic acid': 60,
    'Vitamin E (alpha-tocopherol)': 30,
    'Vitamin D': 400,
  };

  var nutrientSuggestions = {
    // 'Water': 'Drink A Glass of Water!',
    // 'Energy': 'Eat More!',
    // 'Protein': 'Eat a Steak!',
    // 'Alcohol, ethyl': 'You might be stressed out, have a glass of wine.',
    // 'Caffeine': 'Low on Caff',
    // 'Carbohydrate': 'Low on Carbs',
    // 'Fat': 'Low on Fat',
    //
    // 'Total lipid (fat)': 'Low on Fat',
    // 'Fatty acids, total saturated': 'Low on this stuff',
    // 'Fatty acids, total monounsaturated': 'Low on this stuff',
    // 'Fatty acids, total polyunsaturated': 'Low on this stuff',
    // '20:5 n-3 (EPA)': 'Low on this stuff',
    // '22:5 n-3 (DPA)': 'Low on this stuff',
    // '22:6 n-3 (DHA)': 'Low on this stuff',
    // 'Cholesterol': 'Low on this stuff',
    //
    // 'Carbohydrate, by difference': 'Low on this stuff',
    // 'Fiber, total dietary': 'Low on this stuff',
    // 'Sugars, total': 'Low on this stuff',

    'Calcium, Ca': 'Try drinking more milk and eating more spinach.',
    'Iron, Fe': 'Try eating more mussels.',
    'Magnesium, Mg': 'Low on this stuff',
    'Phosphorus, P': 'Low on this stuff',
    'Potassium, K': 'Add some Bananas to your breakfast routine, or throw one in as a midday snack.',
    'Sodium, Na': 'Low on this stuff',
    'Zinc, Zn': 'Low on this stuff',
    'Copper, Cu': 'A deficiency in copper results in poorly formed red blood cells, known as anemia. It also is an antioxidant, helping with the elimination of free radicals. Eat some Beef Liver or Sunflower seeds to improve this mineral.',
    'Selenium, Se': 'Low on this stuff',

    'Vitamin A, IU': 'Low on this stuff',
    'Thiamin': 'Try eating some more Pork to raise your B1.' ,
    'Riboflavin': 'Riboflavin is required for the proper development and function of the skin, lining of the digestive tract, blood cells, and many other parts of the body. Beef Liver, Lamb, and Whole Milk can increase your number here.',
    'Vitamin B-12': 'Low on this stuff',
    'Vitamin B-6': 'Low on this stuff',
    'Niacin': 'Low on this stuff',
    'Folate, total': 'Low on this stuff',
    'Vitamin C, total ascorbic acid': 'Low on this stuff',
    'Vitamin E (alpha-tocopherol)': 'Low on this stuff',
    'Vitamin D': 'Low on this stuff',
  };

  var lowestVitamin = lowestNutrientPerCat(list.vitamins);
  var lowestMineral = lowestNutrientPerCat(list.minerals);

  if (lowestVitamin) {
    var vit = {
      name: _.keys(lowestVitamin)[0],
      value: lowestVitamin[_.keys(lowestVitamin)[0]],
      suggestion: nutrientSuggestions[_.keys(lowestVitamin)[0]]
    };
  }

  if (lowestMineral) {
    var min = {
      name: _.keys(lowestMineral)[0],
      value: lowestMineral[_.keys(lowestMineral)[0]],
      suggestion: nutrientSuggestions[_.keys(lowestMineral)[0]]
    };
  }


  return {
    lowVitamin: vit || {},
    lowMineral: min || {}
  };
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
          var suggestion = makeASuggestion(totals);

          res.send({
            suggestion: suggestion,
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
