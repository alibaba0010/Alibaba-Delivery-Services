import React, { ChangeEvent, DragEvent, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { mealCategoryItems } from "../../app/configs/constants";
import { useMutation } from "@apollo/client";
import { ADD_MEAL } from "../../graphql/actions/add.meal.action";
import toast from "react-hot-toast";
const formSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().min(10).max(200),
  price: z.number().min(0),
  estimatedPrice: z.number().min(0),
  category: z.string().min(3).max(50),
  images: z.array(z.string()),
});
type addMealSchema = z.infer<typeof formSchema>;
const AddMeal = () => {
  const [addMealMutation] = useMutation(ADD_MEAL);
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<addMealSchema>({
    resolver: zodResolver(formSchema),
  });
  const [drag, setDrag] = useState(false);
  const onSubmitHandler = async (data: addMealSchema) => {
    const { name, description, price, estimatedPrice, category, images } = data;
    try {
      const response = await addMealMutation({
        variables: {
          addMealDto: {
            name,
            description,
            price,
            estimatedPrice,
            category,
            images,
          },
        },
      });
      console.log("Response: ", response);
      toast.success("Meal added successfully");
      reset();
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDrag(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDrag(false);
  };
  // for drag and drop
  const handleImageDrop = (e: DragEvent<HTMLLabelElement>) => {};

  //for selecting fields for image
  const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // setValue("images", Array.from(e.target.files), { shouldValidate: true });
    if (e.target.files) {
      const files = Array.from(e.target.files);

      const imageArray = files.map((file) => {
        const reader = new FileReader();
        return new Promise<string>((resolve) => {
          reader.onload = () => {
            if (reader.readyState === 2) {
              resolve(reader.result as string);
            }
          };
          reader.readAsDataURL(file);
        });
      });
      Promise.all(imageArray).then((imageUrls) => {
        setValue("images", imageUrls);
      });
    }
  };

  return (
    <div className="w-full pb-10">
      <div className="md:w-[70%] w-full m-auto">
        <form onSubmit={handleSubmit(onSubmitHandler)} className="mt-5">
          <div>
            <label className="label">Enter Meal Name</label>
            <input
              {...register("name")}
              type="text"
              placeholder="BBQ Chicken Pizza"
              className="input"
            />
            {errors.name && (
              <span className="text-red-500 block mt-1">
                {errors.name?.message}
              </span>
            )}
          </div>
          <div>
            <label className="label mt-2">Enter Meal Description</label>
            <textarea
              {...register("description")}
              rows={8}
              cols={25}
              placeholder="This BBQ chicken pizza has spicy barbecue sauce, diced chicken, peppers, onion, and cilantro, all covered with cheese and baked to bubbly goodness! This is similar to a recipe I had at a popular pizza place in California. My family loves it!"
              className="input !h-[unset] !p-2"
            ></textarea>
            {errors.description && (
              <span className="text-red-500 block mt-1">
                {errors.description?.message}
              </span>
            )}
          </div>
          <div className="flex items-center flex-wrap justify-between">
            <div className="w-[48%]">
              <label className="label mt-2">Enter Meal Price</label>
              <input
                {...register("price", {
                  valueAsNumber: true,
                })}
                type="number"
                placeholder="12"
                className="input"
              />
              {errors.price && (
                <span className="text-red-500 block mt-1">
                  {errors.price?.message}
                </span>
              )}
            </div>
            <div className="w-[48%]">
              <label className="label mt-2">Enter Meal Estimated price</label>
              <input
                {...register("estimatedPrice", {
                  valueAsNumber: true,
                })}
                type="number"
                placeholder="25"
                className="input"
              />
              {errors.estimatedPrice && (
                <span className="text-red-500 block mt-1">
                  {errors.estimatedPrice?.message}
                </span>
              )}
            </div>
          </div>
          <div>
            <label className="label mt-2">Select Meal Category</label>
            <select
              className="input"
              defaultValue=""
              {...register("category")}
              onChange={(e) => {
                setValue("category", e.target.value);
              }}
            >
              <option value="" disabled className="bg-black text-xl">
                Select a category
              </option>
              {mealCategoryItems.map((i: MealCategoryType) => (
                <option value={i.title} key={i.title} className="bg-black">
                  {i.title}
                </option>
              ))}
            </select>

            {errors.category && (
              <span className="text-red-500 block mt-1">
                {errors.category?.message}
              </span>
            )}
          </div>
          <div>
            <label className="label mt-3">Upload Meal images</label>
            <div className="w-full">
              <input
                type="file"
                required
                accept="image/*"
                multiple
                id="file"
                className="hidden"
                onChange={handleImageFileChange}
              />
              <label
                htmlFor="file"
                className={`w-full mt-2 rounded-md min-h-[15vh] border-white p-3 border flex items-center justify-center ${
                  drag ? "bg-blue-500" : "bg-transparent"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleImageDrop}
              >
                {watch("images") ? (
                  <>
                    {watch("images")?.map((i: string) => (
                      <Image
                        src={i}
                        alt=""
                        width={300}
                        height={300}
                        key={i}
                        className="w-full md:w-[48%] object-cover md:m-2 my-2"
                      />
                    ))}
                  </>
                ) : (
                  <span className="text-white">
                    Drag and drop your meal images here or click to browse
                  </span>
                )}
              </label>
            </div>
          </div>
          <input
            type="submit"
            value={"create"}
            disabled={isSubmitting}
            className="button !w-[200px] mt-5 !p-0 !text-2xl justify-self-center"
          />
        </form>
      </div>
    </div>
  );
};

export default AddMeal;
//   ingredients: z.array(z.string().min(3).max(100)),
//   preparationTime: z.number().min(1).max(60),
//   cookingTime: z.number().min(1).max(60),
//   servingSize: z.number().min(1).max(100),
//   servings: z.number().min(1).max(100),

// const handleImageFileChange = async (e: ChangeEvent<HTMLInputElement>) => {

//   if (e.target.files) {
//     const files = Array.from(e.target.files);

//     const readFileAsDataURL = (file: File): Promise<string> => {
//       return new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.onload = () => {
//           if (reader.readyState === 2) {
//             resolve(reader.result as string);
//           }
//         };
//         reader.readAsDataURL(file);
//       });
//     };

//     const handleFiles = async () => {
//       const imageUrls = await Promise.all(
//         files.map((file) => readFileAsDataURL(file))
//       );
//       setValue("images", imageUrls);
//     };

//     await handleFiles();
//   }
// };
// const extractFileName = (fullFileName) => {
//   const match = fullFileName.match(
//     /(\d{4}-\d{2}-\d{2} \d{2}-\d{2}-\d{2}\.png)$/
//   );
//   return match ? match[0] : fullFileName; // Return the match or the original name if no match
// };

// const fileName = e.target.files[0].name;
// const extractedName = extractFileName(fileName);
// console.log("Extracted file name:", extractedName);
