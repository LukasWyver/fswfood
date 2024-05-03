import { db } from "@/_lib/prisma";
import CategoryItem from "./category-item";

const CategoryList = async () => {
  const categories = await db.category.findMany({});

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {categories.map((category) => (
        <CategoryItem category={category} key={category.id} />
      ))}
    </div>
  );
};

export default CategoryList;
