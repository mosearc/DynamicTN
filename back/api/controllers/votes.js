const Vote = require('../models/vote')
const Post = require('../models/post')
const Poll = require('../models/poll')
const mongoose = require('mongoose')

exports.save_option_vote = async (req,res,next) => {

	let voteExists = false 

	await Vote.find({user:req.userData.userId,poll:req.params.pollId}).then(result=>{
		if(result.length>0){
			console.log(result)
			voteExists = true;
			return res.sendStatus(409)
		}
	}).catch(err=>{
		console.error(err)
		res.status(500).json({error:err})
	})

	if(!voteExists){
		Poll.findById(req.params.pollId)
			.then(poll => {
				if (!poll) {
					return res.status(404).json({ message: 'Poll not found' });
					console.log("dio")
				}

				const answer = poll.answers.find(a => a.answer === req.body.answer);
				if (!answer) {
					return res.status(404).json({ message: 'Answer not found' });

					console.log("cane")
				}

				answer.votes += 1;


				const new_vote = Vote({user:req.userData.userId,poll:req.params.pollId})	
				new_vote["_id"] = new mongoose.Types.ObjectId()
				new_vote.save()
				return poll.save();
			})
			.then(updatedPoll => {
				res.status(200).json({
					message: 'Vote registered successfully',
					poll: updatedPoll,
					request: {
						type: 'GET',
						url: `http://localhost:3000/polls/${req.params.pollId}`
					}
				});
			})
			.catch(err => {
				console.error(err);
				res.status(500).json({ error: err });
			});
	}

}

exports.get_votes_post = (req,res,next) => {
	Vote.find({post:req.params.postId}).then(result=>{

		if(!result.length){
			return res.sendStatus(404)
		}else{
			res.status(200).json({nrLikes:result.length})
		}
		
	}).catch((err)=>{
		console.error(err)
		res.send(500).json({error:err})
	})
}

exports.save_upvote = async (req,res,next) => {
	const new_upvote = {
		post:req.params.postId,
		user:req.userData.userId
	}

	//controlliamo prima che il post esista, se non è così si ritorna 404,
	//altrimenti si passa a creare il voto
	let postExists = true
	
	await Post.findById(new_upvote.post).then((result)=>{
		if(result === null){
			postExists = false
			res.sendStatus(404)
		}
	}).catch((err)=>{
		console.error(err)
		postExists = false
		res.sendStatus(500)
	})

	if(postExists){
		Vote.find(new_upvote).exec().then((result)=>{
			console.log(result)
			if(result.length>0){
				return res.sendStatus(409)
			}


			const new_vote = Vote(new_upvote)	
			new_vote["_id"] = new mongoose.Types.ObjectId()
			new_vote.save()

			res.send(200)
		}).catch((err)=>{
			console.error(err)
			res.send(500).json({error:err})
		})
	}
}
