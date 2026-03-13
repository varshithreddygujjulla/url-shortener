import e from "express";
import { Url } from "../models/Url.js "
import shortid from "shortid";

export const shortUrl = async (req,res)=>{
const longUrl = req.body.longUrl;
const shortCode=shortid.generate();

const shortUrl = `http://localhost:1000/${shortCode}`

// save to database
const newUrl = new Url({shortCode,longUrl})
await newUrl.save();

console.log("short saved = ",newUrl)

res.render("index.ejs",{shortUrl})

}

export const gerOriginalUrl = async (req,res)=>{
   const shortCode = req.params.shortcode

   //finding on database
   const OriginalUrl= await Url.findOne({shortCode})
   if(OriginalUrl){
    res.redirect(OriginalUrl.longUrl)
   }else{
    res.json({message:"invalid shortCode"})
   }
}
