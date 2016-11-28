angular.module('Truffl')
  .filter('nutrientDisplayName', function() {

    var nameMap = _.mapKeys({
      'Water': 'Water',
      'Energy': 'Energy',
      'Protein': 'Protein',
      'Alcohol, ethyl': 'Alcohol',
      'Caffeine': 'Caffeine',
      'Fat': 'Fat',
      'Carbohydrate': 'Carbs',

      'Total lipid (fat)': 'Fat',
      'Fatty acids, total saturated': 'Saturated',
      'Fatty acids, total monounsaturated': 'Monounsaturated',
      'Fatty acids, total polyunsaturated': 'Polyunsaturated',
      '20:5 n-3 (EPA)': 'EPA',
      '22:5 n-3 (DPA)': 'DPA',
      '22:6 n-3 (DHA)': 'DHA',
      'Cholesterol': 'Cholesterol',

      'Carbohydrate, by difference': 'Carbohydrate',
      'Fiber, total dietary': 'Fiber',
      'Sugars, total': 'Sugars',

      'Calcium, Ca': 'Calcium',
      'Iron, Fe': 'Iron',
      'Magnesium, Mg': 'Magnesium',
      'Phosphorus, P': 'Phosphorus',
      'Potassium, K': 'Potassium',
      'Sodium, Na': 'Sodium',
      'Zinc, Zn': 'Zinc',
      'Copper, Cu': 'Copper',
      'Selenium, Se': 'Selenium',

      'Vitamin A, IU': 'Vitamin A',
      'Thiamin': 'B1 (Thiamin)',
      'Riboflavin': 'B2 (Riboflavin)',
      'Vitamin B-12': 'B12 (Cobalamin)',
      'Vitamin B-6': 'B6 (Pyrodoxine)',
      'Niacin': 'B3(Niacin)',
      'Folate, total': 'Folate',
      'Vitamin C, total ascorbic acid': 'Vitamin C',
      'Vitamin E (alpha-tocopherol)': 'Vitamin E',
      'Vitamin D': 'Vitamin D'
    }, function(val, key) {
      return _.camelCase(key);
    });

  return function(input, optional1, optional2) {

    return nameMap[input] || input;
  }

});
