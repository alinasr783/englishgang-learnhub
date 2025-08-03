import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Pencil, Trash2, CreditCard, Smartphone, Building } from "lucide-react";

interface PaymentMethod {
  id: string;
  name: string;
  type: string;
  details: string;
  is_active: boolean;
  created_at: string;
}

const AdminPayments = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMethod, setEditingMethod] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    details: '',
    is_active: true
  });
  const { toast } = useToast();

  const paymentTypes = [
    { value: 'mobile_wallet', label: 'Mobile Wallet', icon: Smartphone },
    { value: 'bank_account', label: 'Bank Account', icon: Building },
    { value: 'instant_payment', label: 'Instant Payment', icon: CreditCard }
  ];

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      const { data, error } = await supabase
        .from('payment_methods')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPaymentMethods(data || []);
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      toast({
        title: "Error",
        description: "Failed to fetch payment methods",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingMethod) {
        const { error } = await supabase
          .from('payment_methods')
          .update(formData)
          .eq('id', editingMethod);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Payment method updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('payment_methods')
          .insert([formData]);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Payment method added successfully",
        });
      }
      
      await fetchPaymentMethods();
      resetForm();
    } catch (error) {
      console.error('Error saving payment method:', error);
      toast({
        title: "Error",
        description: "Failed to save payment method",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (method: PaymentMethod) => {
    setFormData({
      name: method.name,
      type: method.type,
      details: method.details,
      is_active: method.is_active
    });
    setEditingMethod(method.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this payment method?')) return;
    
    try {
      const { error } = await supabase
        .from('payment_methods')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Payment method deleted successfully",
      });
      
      await fetchPaymentMethods();
    } catch (error) {
      console.error('Error deleting payment method:', error);
      toast({
        title: "Error",
        description: "Failed to delete payment method",
        variant: "destructive",
      });
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('payment_methods')
        .update({ is_active: !currentStatus })
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Payment method status updated",
      });
      
      await fetchPaymentMethods();
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({ name: '', type: '', details: '', is_active: true });
    setEditingMethod(null);
    setShowForm(false);
  };

  const getTypeIcon = (type: string) => {
    const typeData = paymentTypes.find(t => t.value === type);
    return typeData?.icon || CreditCard;
  };

  const getTypeLabel = (type: string) => {
    const typeData = paymentTypes.find(t => t.value === type);
    return typeData?.label || type;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Payment Methods</h2>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Payment Method
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingMethod ? 'Edit' : 'Add'} Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Method Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Vodafone Cash"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment type" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className="w-4 h-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="details">Details</Label>
                <Textarea
                  id="details"
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Account number, wallet number, or other details"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="is_active">Active</Label>
              </div>

              <div className="flex gap-2">
                <Button type="submit">
                  {editingMethod ? 'Update' : 'Add'} Payment Method
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paymentMethods.map((method) => {
          const IconComponent = getTypeIcon(method.type);
          return (
            <Card key={method.id} className="relative">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{method.name}</h3>
                      <p className="text-sm text-muted-foreground">{getTypeLabel(method.type)}</p>
                    </div>
                  </div>
                  <Badge variant={method.is_active ? "default" : "secondary"}>
                    {method.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                    {method.details}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(method)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant={method.is_active ? "secondary" : "default"} 
                    onClick={() => toggleStatus(method.id, method.is_active)}
                  >
                    {method.is_active ? "Deactivate" : "Activate"}
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(method.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {paymentMethods.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Payment Methods</h3>
            <p className="text-muted-foreground mb-4">Add your first payment method to get started.</p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Payment Method
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminPayments;