var mongoose = require('mongoose'),

    JournalSchema = mongoose.Schema({
    date : Date,
    name: String,
    ndbno: Number,
    nutrients : {
      'Water': Array,
      'Energy': Array,
      'Protein': Array,
      'Alcohol, ethyl': Array,
      'Caffeine': Array,
      'Fat': Array,
      'Carbohydrate': Array,

      'fats': {
        'Total lipid (fat)': Array,
        'Fatty acids, total saturated': Array,
        'Fatty acids, total monounsaturated': Array,
        'Fatty acids, total polyunsaturated': Array,
        '20:5 n-3 (EPA)': Array,
        '22:5 n-3 (DPA)': Array,
        '22:6 n-3 (DHA)': Array,
        'Cholesterol': Array,
      },

      'carbs': {
        'Carbohydrate, by difference': Array,
        'Fiber, total dietary': Array,
        'Sugars, total': Array,
      },

      'minerals': {
        'Calcium, Ca': Array,
        'Iron, Fe': Array,
        'Magnesium, Mg': Array,
        'Phosphorus, P': Array,
        'Potassium, K': Array,
        'Sodium, Na': Array,
        'Zinc, Zn': Array,
        'Copper, Cu': Array,
        'Selenium, Se': Array,
      },

      'vitamins': {
        'Vitamin A, IU': Array,
        'Thiamin': Array,
        'Riboflavin': Array,
        'Vitamin B-12': Array,
        'Vitamin B-6': Array,
        'Niacin': Array,
        'Folate, total': Array,
        'Vitamin C, total ascorbic acid': Array,
        'Vitamin E (alpha-tocopherol)': Array,
        'Vitamin D': Array
      }
    },

    user : {
      type : mongoose.Schema.ObjectId,
      ref : 'User'
    }

}, { timestamps: true });

module.exports = mongoose.model('Journal', JournalSchema);
