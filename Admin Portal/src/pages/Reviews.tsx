import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Filter, MoreHorizontal, Eye, MessageSquare, Flag, Star, TrendingUp, Users } from "lucide-react";

const mockReviews = [
  {
    id: 1,
    customer: "Alice Johnson",
    email: "alice@example.com",
    avatar: "/placeholder-avatar.jpg",
    product: "Premium Headphones",
    rating: 5,
    title: "Excellent sound quality!",
    comment: "These headphones exceeded my expectations. The sound quality is amazing and they're very comfortable to wear for long periods.",
    date: "2024-01-20",
    status: "approved",
    verified: true
  },
  {
    id: 2,
    customer: "Bob Smith",
    email: "bob@example.com",
    avatar: "/placeholder-avatar.jpg",
    product: "Smart Watch Pro",
    rating: 4,
    title: "Great features, minor issues",
    comment: "Love most features but the battery life could be better. Overall satisfied with the purchase.",
    date: "2024-01-19",
    status: "approved",
    verified: true
  },
  {
    id: 3,
    customer: "Carol White",
    email: "carol@example.com",
    avatar: "/placeholder-avatar.jpg",
    product: "Wireless Earbuds",
    rating: 2,
    title: "Poor connection quality",
    comment: "Keeps disconnecting from my phone. Very frustrating experience. Would not recommend.",
    date: "2024-01-18",
    status: "flagged",
    verified: false
  },
  {
    id: 4,
    customer: "David Brown",
    email: "david@example.com",
    avatar: "/placeholder-avatar.jpg",
    product: "Gaming Mouse",
    rating: 5,
    title: "Perfect for gaming",
    comment: "Responsive and accurate. Great for competitive gaming. Highly recommend!",
    date: "2024-01-17",
    status: "approved",
    verified: true
  },
  {
    id: 5,
    customer: "Eva Martinez",
    email: "eva@example.com",
    avatar: "/placeholder-avatar.jpg",
    product: "Premium Headphones",
    rating: 3,
    title: "Average product",
    comment: "It's okay but nothing special. Expected more for the price point.",
    date: "2024-01-16",
    status: "pending",
    verified: false
  }
];

const Reviews = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved": return "bg-success/10 text-success border-success/20";
      case "pending": return "bg-warning/10 text-warning border-warning/20";
      case "flagged": return "bg-destructive/10 text-destructive border-destructive/20";
      case "rejected": return "bg-muted/10 text-muted-foreground border-muted/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating 
                ? "fill-yellow-400 text-yellow-400" 
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const filteredReviews = mockReviews.filter(review =>
    review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const averageRating = (mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length).toFixed(1);
  const totalReviews = mockReviews.length;
  const pendingReviews = mockReviews.filter(r => r.status === 'pending').length;
  const flaggedReviews = mockReviews.filter(r => r.status === 'flagged').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>
          <p className="text-muted-foreground">Manage customer reviews and feedback</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold">{averageRating}</div>
              {renderStars(Math.round(parseFloat(averageRating)))}
            </div>
            <p className="text-xs text-muted-foreground">
              Based on {totalReviews} reviews
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReviews}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline mr-1 h-3 w-3 text-success" />
              +18% this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Users className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{pendingReviews}</div>
            <p className="text-xs text-muted-foreground">
              Need moderation
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged</CardTitle>
            <Flag className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{flaggedReviews}</div>
            <p className="text-xs text-muted-foreground">
              Require attention
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Review Management</CardTitle>
          <CardDescription>
            Monitor and moderate customer reviews and ratings
          </CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Review</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={review.avatar} />
                      <AvatarFallback>{review.customer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium flex items-center space-x-2">
                        <span>{review.customer}</span>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">Verified</Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">{review.email}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{review.product}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {renderStars(review.rating)}
                      <span className="text-sm font-medium">{review.rating}/5</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[300px]">
                    <div>
                      <div className="font-medium text-sm">{review.title}</div>
                      <div className="text-sm text-muted-foreground truncate">{review.comment}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(review.status)}>
                      {review.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{review.date}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Full Review
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Approve Review
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Flag className="mr-2 h-4 w-4" />
                          Flag Review
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reviews;