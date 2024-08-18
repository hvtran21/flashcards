import { NextResponse } from "next/server";
import db from '../../../utils/firebase';

import { doc, setDoc } from "firebase/firestore"; 

// Add a new document in collection "cities"
// await setDoc(doc(db, "cities", "LA"), {
//   name: "Los Angeles",
//   state: "CA",
//   country: "USA"
// });

export async function POST(req) {
  console.log(req);
  return NextResponse.json("200 success");
}
