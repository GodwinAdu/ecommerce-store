import { CategoryForm } from "@/components/categories/CategoryForm";
import { getBillboard } from "@/lib/actions/billboard.actions";
import { fetchCategoryById } from "@/lib/actions/category.actions";


const CategoryPage = async ({
    params
}: {
    params: { categoryId: string, storeId: string }
}) => {
    const category = await fetchCategoryById({
        id: params.storeId,
    });

    const billboards = await getBillboard({
        storeId: params.storeId
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryForm billboards={billboards} initialData={category} />
            </div>
        </div>
    );
}

export default CategoryPage;
