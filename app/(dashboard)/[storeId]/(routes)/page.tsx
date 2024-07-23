import { Overview } from "@/components/Overview";
import Heading from "@/components/heading/Heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreditCard, DollarSign, Package } from "lucide-react";

const DashboardPage = () => {
  return (
    <div className="flex-col px-2 ">
      <div className="flex-1 space-y-4  pt-6 ">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className="mx-auto">
          <div className="flex flex-1 gap-4  overflow-x-auto">
            <Card className="flex flex-col flex-0 w-full  bg-white  transition-all duration-200 hover:text-white hover:bg-red-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">totalRevenue</div>
              </CardContent>
            </Card>
            <Card className="flex flex-col flex-0 w-full bg-white  transition-all duration-200 hover:text-white hover:bg-red-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">salesCount</div>
              </CardContent>
            </Card>
            <Card className="flex flex-col flex-0 w-full bg-white  transition-all duration-200 hover:text-white hover:bg-red-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Products In Stock
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">stockCount</div>
              </CardContent>
            </Card>
            <Card className="flex flex-col flex-0 w-full bg-white  transition-all duration-200 hover:text-white hover:bg-red-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Products In Stock
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">stockCount</div>
              </CardContent>
            </Card>
            <Card className="flex flex-col flex-0 w-full bg-white  transition-all duration-200 hover:text-white hover:bg-red-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Products In Stock
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">stockCount</div>
              </CardContent>
            </Card>
            <Card className="flex flex-col flex-0 w-full bg-white  transition-all duration-200 hover:text-white hover:bg-red-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Products In Stock
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">stockCount</div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
