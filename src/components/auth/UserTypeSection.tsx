
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Control } from "react-hook-form";
import { RegisterInput } from "@/lib/validations/auth";

interface UserTypeSectionProps {
  control: Control<RegisterInput>;
}

export function UserTypeSection({ control }: UserTypeSectionProps) {
  return (
    <FormField
      control={control}
      name="userType"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel>I want to join as a:</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="traveler" id="traveler-reg" />
                <Label htmlFor="traveler-reg">Traveler</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="guide" id="guide-reg" />
                <Label htmlFor="guide-reg">Guide</Label>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
