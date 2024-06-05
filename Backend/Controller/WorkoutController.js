const Workout = require('../models/WorkoutModel')
const mongoose = require('mongoose')

//get all workouts
const getWorkouts = async(req,res)=>{
    const workouts = await Workout.find({}).sort({createdAt:-1})
    res.status(200).json(workouts)
}

//get single workout
const getWorkout = async (req,res)=>{
    const {id} =req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({erroe:'NO such workout'})
    }

    const workout = await Workout.findById(id)
    if(!workout){
        return res.status(404).send({error:`No workout with the id ${id}`});

    }
    res.status(200).json(workout);
}





//create new workout
const createWorkout = async (req, res) => {

    const {title,load,reps}=req.body
    let emptyFields=[]
    if(!title){
        emptyFields.push("title")
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
        }
    if(emptyFields.length>0){
        return res.status(400).json({message:"Please fill in "+emptyFields.join(', ')+" fields."})
    }
    
    try{
        const workout= await Workout.create({title,load,reps})
        res.status(200).json(workout)
    }catch (error){
        res.status(400).json({error:error.message})
    }

}

//delete a workout
const deleteWorkout = async (req,res)=>{
    const {id}=req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send({ error: 'No workout with that ID was found.' });
      }
      const workout = await Workout.findByIdAndRemove({_id: id});
  
      if (!workout) {
        return res.status(404).send({ error: 'No workout with this ID was found.' });
      }
      res.send({ message: 'The workout has been deleted successfully!' });
  };


  //update a workout
  const updateWorkout =async (req,res)=>{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such workout"})
    }
    const workout = await Workout.findOneAndUpdate({_id: id},{
        ...req.body
    })
    if(!workout){
        return res.status(404).json({error:'no such workout'})
    }
    res.status(200).json(workout)

  }

module.exports={
    getWorkouts,
    updateWorkout,
    getWorkout,
    createWorkout,
    deleteWorkout
};
