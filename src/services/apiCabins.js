import supabase, { supabaseUrl } from "./supabase";
export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}

export async function createCabin(newCabin) {
  // Create the cabin
  const imageName = `${Math.random()}-${newCabin[0].image.name}`.replaceAll("/","");
  
  const imagePath = `${supabaseUrl}/storage/v1/object/public/carbin-images/${imageName}`

  console.log({ ...newCabin, image: imagePath});
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin[0], image: imagePath}]).select('*')
  if (error) {
    console.log(error);
    throw new Error("Cabin could not created");
  }

  // Upload the image
  const { error: storageError } = await supabase
  .storage
  .from('carbin-images')
  .upload(imageName, newCabin[0].image);

  console.log(newCabin[0].image)

  //Delete the cabin if there was an error uploading the immage
  if(storageError){
     await deleteCabin(data[0].id)
     console.error(storageError);
     throw new Error("Cabin image could not be uploaded and the cabin was not created");
  }

  return data;
}
