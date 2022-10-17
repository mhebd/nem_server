const asyncHdl = require('./asyncHdl');
const errMsg = require('./errMsg');
const Result = require('./result');


/**
 * ==============================================
 * 							Find One Oparetion
 * ============================================== 
 */

 exports.findOne = (Model, populateOpt) => asyncHdl(async (req, res, next) => {
 	let query = Model.findById(req.params.id);
 	if(populateOpt) query = query.populate(populateOpt);
 	const data = await query;

  if(!data) {
    return next(new errMsg('Document not found!', 404));
  };

 	return res.status(200).json(new Result(true, '', {data}));
 });




/**
 * ==============================================
 * 							Find All Oparetion
 * ============================================== 
 */

	exports.findAll = (Model, populateOpt, sort) => asyncHdl(async (req, res, next) => {
 	const {limit, page} = req.query;

 	let query = Model.find();
 	if(sort) query = query.sort(sort);
 	if(page) query = query.skip(+limit * (+page - 1));
 	if(limit) query = query.limit(+limit);
 	if(populateOpt) query = query.populate(populateOpt);
 	const data = await query;

 	return res.status(200).json(new Result(true, '', {data}));
 });




/**
 * ==============================================
 * 							Create One Oparetion
 * ============================================== 
 */

 exports.createOne = (Model, options = {}) => asyncHdl(async (req, res, next) => {
  const file = req?.file;
  const {destination} = options;

  if(file && destination) {
    req.body[file.fieldname] = `${destination}/${file.filename}`;
  }

 	const data = await Model.create(req.body);

 	return res.status(201).json(new Result(true, 'Document Create Successfull!', {data}));
 });




/**
 * ==============================================
 * 							Update One Oparetion
 * ============================================== 
 */

 exports.updateOne = (Model, options = {}) => asyncHdl(async (req, res, next) => {
  const file = req?.file;
  const {destination} = options;
  
  if(file && destination) {
    req.body[file.fieldname] = `${destination}/${file.filename}`;
  }

 	const data = await Model.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true, runValidators: true});

  if(!data) {
    return next(new errMsg('Document not found!', 404));
  };

 	return res.status(200).json(new Result(true, 'Document Updated Successfull!', {data}));
 });


 


/**
 * ==============================================
 * 							Delete One Oparetion
 * ============================================== 
 */
 exports.deleteOne = (Model) => asyncHdl(async (req, res, next) => {
 	const data = await Model.findByIdAndDelete(req.params.id);

  if(!data) {
    return next(new errMsg('Document not found!', 404));
  };

 	return res.status(200).json(new Result(true, 'Document Deleted Successfull!', {data}));
 })