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

export async function createEditCabin(newCabin, id) {
  const hasImgPath = newCabin.image?.startsWith?.(supabaseUrl);
  
  // Create the cabin
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImgPath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/carbin-images/${imageName}`;

  let query = supabase.from("cabins");

  // For Creating a new cabin.
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  // For Editing a cabin
  if (id) {
    query = query.update({...newCabin, image: imagePath})
      .eq("id", id)
      .select();
  }

  const { data, error } = await query.select("*").single();

  if (error) {
    console.log(error);
    throw new Error("Cabin could not created");
  }

  // Upload the image
  const { error: storageError } = await supabase.storage
    .from("carbin-images")
    .upload(imageName, newCabin.image);

  //Delete the cabin if there was an error uploading the immage
  if (storageError) {
    await deleteCabin(data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}
