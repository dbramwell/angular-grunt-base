var mongoose = require ("mongoose");

var GcseSchema = new mongoose.Schema({
	subject: { type: String, required: true },
	grade: { type: String, required: true }
});

var GcseModel = mongoose.model('GCSE', GcseSchema);

GcseSchema.pre('save', function (next) {
    var self = this;
    GcseModel.find({subject : self.subject}, function (err, docs) {
        if (!docs.length){
            next();
        }else{                
            console.log('GCSE exists: ',self.subject);
            next(new Error("GCSE exists!"));
        }
    });
});

module.exports = GcseModel;