var mongoose = require('mongoose'),

    JournalSchema = mongoose.Schema({
    date : Date,
    name: String,
    ndbno: Number,
    nutrients : {
      'Water': Array,
      'Energy': Array,
      'Protein': Array,
      'Total lipid (fat)': Array,
      'Ash': Array,
      'Carbohydrate, by difference': Array,
      'Fiber, total dietary': Array,
      'Sugars, total': Array,
      'Calcium, Ca': Array,
      'Iron, Fe': Array,
      'Magnesium, Mg': Array,
      'Phosphorus, P': Array,
      'Potassium, K': Array,
      'Sodium, Na': Array,
      'Zinc, Zn': Array,
      'Copper, Cu': Array,
      'Selenium, Se': Array,
      'Vitamin C, total ascorbic acid': Array,
      'Thiamin': Array,
      'Riboflavin': Array,
      'Niacin': Array,
      'Vitamin B-6': Array,
      'Folate, total': Array,
      'Folic acid': Array,
      'Folate, food': Array,
      'Folate, DFE': Array,
      'Choline, total': Array,
      'Vitamin B-12': Array,
      'Vitamin B-12, added': Array,
      'Vitamin A, RAE': Array,
      'Retinol': Array,
      'Carotene, beta': Array,
      'Carotene, alpha': Array,
      'Cryptoxanthin, beta': Array,
      'Vitamin A, IU': Array,
      'Lycopene': Array,
      'Lutein + zeaxanthin': Array,
      'Vitamin E (alpha-tocopherol)': Array,
      'Vitamin E, added': Array,
      'Vitamin D (D2 + D3)': Array,
      'Vitamin D': Array,
      'Vitamin K (phylloquinone)': Array,
      'Fatty acids, total saturated': Array,
      '4:0': Array,
      '6:0': Array,
      '8:0': Array,
      '10:0': Array,
      '12:0': Array,
      '14:0': Array,
      '16:0': Array,
      '18:0': Array,
      'Fatty acids, total monounsaturated': Array,
      '16:1 undifferentiated': Array,
      '18:1 undifferentiated': Array,
      '20:1': Array,
      '22:1 undifferentiated': Array,
      'Fatty acids, total polyunsaturated': Array,
      '18:2 undifferentiated': Array,
      '18:3 undifferentiated': Array,
      '18:4': Array,
      '20:4 undifferentiated': Array,
      '20:5 n-3 (EPA)': Array,
      '22:5 n-3 (DPA)': Array,
      '22:6 n-3 (DHA)': Array,
      'Cholesterol': Array,
      'Alcohol, ethyl': Array,
      'Caffeine': Array,
      'Theobromine': Array,
    },

    user : {
      type : mongoose.Schema.ObjectId,
      ref : 'User'
    },
});

module.exports = mongoose.model('Journal', JournalSchema);
