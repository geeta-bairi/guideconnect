
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { Control } from "react-hook-form";
import { RegisterInput } from "@/lib/validations/auth";

interface AgreementSectionProps {
  control: Control<RegisterInput>;
}

export function AgreementSection({ control }: AgreementSectionProps) {
  return (
    <>
      <FormField
        control={control}
        name="acceptTerms"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                I accept the <Link to="/terms" className="text-travel-blue hover:underline" target="_blank">Terms of Service</Link>
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="acceptPrivacy"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                I accept the <Link to="/privacy" className="text-travel-blue hover:underline" target="_blank">Privacy Policy</Link>
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </>
  );
}
