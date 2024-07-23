import { CategoriesClient } from "@/components/categories/CategoryClient";
import { CategoryColumn } from "@/components/categories/columns";
import { getCategories } from "@/lib/actions/category.actions";
import { format } from "date-fns";

const CategoriesPage = async ({
    params
}: {
    params: { storeId: string }
}) => {

    const storeId = params.storeId as string
    const categories = await getCategories({storeId})

    const formattedCategories: CategoryColumn[] = categories.map((item) => ({
        id: item.id,
        name: item.name,
        billboardLabel: item.billboard.label,
        createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoriesClient data={formattedCategories} />
            </div>
        </div>
    );
};

export default CategoriesPage;
