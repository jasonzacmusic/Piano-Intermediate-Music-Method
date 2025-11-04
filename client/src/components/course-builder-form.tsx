import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseBuilderFormSchema, type CourseBuilderForm } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight, ChevronLeft, Check, Loader2 } from "lucide-react";

const AUTOSAVE_KEY = "nsm_course_builder_draft";

const LEARNING_GOALS = [
  "Play songs by ear",
  "Read sheet music",
  "Understand music theory",
  "Improvise and compose",
  "Prepare for exams",
  "Performance skills",
];

const GENRES = [
  "Classical",
  "Jazz",
  "Pop/Rock",
  "Gospel/Hymns",
  "Film music",
  "Indian classical",
  "World music",
];

const CLASS_INTERESTS = [
  "Piano technique",
  "Music theory",
  "Ear training",
  "Rhythm & world music",
  "Music Factory (transcription)",
  "Music Gym (exercises)",
];

const CALL_TIMES = [
  "Morning (8 AM - 12 PM IST)",
  "Afternoon (12 PM - 5 PM IST)",
  "Evening (5 PM - 9 PM IST)",
  "Weekend only",
];

const COUNTRY_CODES = [
  { code: "+91", country: "India" },
  { code: "+1", country: "USA/Canada" },
  { code: "+44", country: "UK" },
  { code: "+971", country: "UAE" },
  { code: "+65", country: "Singapore" },
  { code: "+61", country: "Australia" },
  { code: "+60", country: "Malaysia" },
  { code: "+86", country: "China" },
  { code: "+49", country: "Germany" },
  { code: "+33", country: "France" },
  { code: "+39", country: "Italy" },
  { code: "+81", country: "Japan" },
  { code: "+82", country: "South Korea" },
  { code: "+34", country: "Spain" },
  { code: "+52", country: "Mexico" },
];

interface CourseBuilderFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CourseBuilderFormModal({ isOpen, onClose }: CourseBuilderFormProps) {
  const [step, setStep] = useState(1);
  const [showCustomCountryCode, setShowCustomCountryCode] = useState(false);
  const { toast } = useToast();

  const form = useForm<CourseBuilderForm>({
    resolver: zodResolver(courseBuilderFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      countryCode: "+91",
      signupFor: "self",
      childAge: "",
      learningGoals: [],
      preferredGenre: [],
      musicBackground: undefined,
      pianoExperience: undefined,
      classInterests: [],
      preferredCallTime: "",
      additionalNotes: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: CourseBuilderForm) => {
      return await apiRequest("POST", "/api/course-builder", data);
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your course preferences have been submitted. We'll contact you soon!",
      });
      localStorage.removeItem(AUTOSAVE_KEY);
      form.reset();
      setStep(1);
      onClose();
    },
    onError: (error: Error) => {
      toast({
        title: "Submission failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem(AUTOSAVE_KEY);
      if (saved) {
        try {
          const data = JSON.parse(saved);
          form.reset(data);
        } catch (e) {
          console.error("Failed to load saved form data", e);
        }
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const subscription = form.watch((value) => {
        localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(value));
      });
      return () => subscription.unsubscribe();
    }
  }, [form, isOpen]);

  const totalSteps = 7;
  const progress = (step / totalSteps) * 100;

  const validateStep = async (currentStep: number): Promise<boolean> => {
    let fieldsToValidate: (keyof CourseBuilderForm)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ["name", "email", "phone", "countryCode"];
        break;
      case 2:
        fieldsToValidate = ["signupFor"];
        break;
      case 3:
        fieldsToValidate = ["learningGoals"];
        break;
      case 4:
        fieldsToValidate = ["preferredGenre"];
        break;
      case 5:
        fieldsToValidate = ["musicBackground", "pianoExperience"];
        break;
      case 6:
        fieldsToValidate = ["classInterests"];
        break;
      case 7:
        fieldsToValidate = ["preferredCallTime"];
        break;
    }

    const result = await form.trigger(fieldsToValidate);
    return result;
  };

  const nextStep = async () => {
    const isValid = await validateStep(step);
    if (isValid && step < totalSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onSubmit = (data: CourseBuilderForm) => {
    submitMutation.mutate(data);
  };

  const signupFor = form.watch("signupFor");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Build Your Course</DialogTitle>
          <DialogDescription>
            Step {step} of {totalSteps}: Customize your learning journey
          </DialogDescription>
        </DialogHeader>

        <Progress value={progress} className="mb-6" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Details</h3>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your full name"
                          data-testid="input-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="your.email@example.com"
                          data-testid="input-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="countryCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Code</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            if (value === "custom") {
                              setShowCustomCountryCode(true);
                              field.onChange("");
                            } else {
                              setShowCustomCountryCode(false);
                              field.onChange(value);
                            }
                          }}
                          value={showCustomCountryCode ? "custom" : field.value}
                        >
                          <FormControl>
                            <SelectTrigger data-testid="select-country-code">
                              <SelectValue placeholder="Code" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {COUNTRY_CODES.map((item) => (
                              <SelectItem key={item.code} value={item.code}>
                                {item.code}
                              </SelectItem>
                            ))}
                            <SelectItem value="custom">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {showCustomCountryCode && (
                          <Input
                            {...field}
                            placeholder="+XX"
                            className="mt-2"
                            data-testid="input-custom-country-code"
                          />
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Phone / WhatsApp</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Phone number"
                            data-testid="input-phone"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Who are you signing up for?</h3>

                <FormField
                  control={form.control}
                  name="signupFor"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="self"
                              id="self"
                              data-testid="radio-signup-self"
                            />
                            <label htmlFor="self" className="cursor-pointer">
                              Myself
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="child"
                              id="child"
                              data-testid="radio-signup-child"
                            />
                            <label htmlFor="child" className="cursor-pointer">
                              My child
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="other"
                              id="other"
                              data-testid="radio-signup-other"
                            />
                            <label htmlFor="other" className="cursor-pointer">
                              Someone else
                            </label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {signupFor === "child" && (
                  <FormField
                    control={form.control}
                    name="childAge"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Child's Age</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="e.g., 8 years"
                            data-testid="input-child-age"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">What are your learning goals?</h3>
                <p className="text-sm text-muted-foreground">Select all that apply</p>

                <FormField
                  control={form.control}
                  name="learningGoals"
                  render={() => (
                    <FormItem>
                      <div className="space-y-3">
                        {LEARNING_GOALS.map((goal) => (
                          <FormField
                            key={goal}
                            control={form.control}
                            name="learningGoals"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(goal)}
                                    onCheckedChange={(checked) => {
                                      const updated = checked
                                        ? [...(field.value || []), goal]
                                        : field.value?.filter((v) => v !== goal) || [];
                                      field.onChange(updated);
                                    }}
                                    data-testid={`checkbox-goal-${goal.toLowerCase().replace(/\s+/g, "-")}`}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  {goal}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Which genres interest you?</h3>
                <p className="text-sm text-muted-foreground">Select all that apply</p>

                <FormField
                  control={form.control}
                  name="preferredGenre"
                  render={() => (
                    <FormItem>
                      <div className="space-y-3">
                        {GENRES.map((genre) => (
                          <FormField
                            key={genre}
                            control={form.control}
                            name="preferredGenre"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(genre)}
                                    onCheckedChange={(checked) => {
                                      const updated = checked
                                        ? [...(field.value || []), genre]
                                        : field.value?.filter((v) => v !== genre) || [];
                                      field.onChange(updated);
                                    }}
                                    data-testid={`checkbox-genre-${genre.toLowerCase().replace(/\s+/g, "-")}`}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  {genre}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Music Background</h3>

                  <FormField
                    control={form.control}
                    name="musicBackground"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-3"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="complete_beginner"
                                id="complete_beginner"
                                data-testid="radio-background-beginner"
                              />
                              <label htmlFor="complete_beginner" className="cursor-pointer">
                                Complete beginner
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="some_lessons"
                                id="some_lessons"
                                data-testid="radio-background-some-lessons"
                              />
                              <label htmlFor="some_lessons" className="cursor-pointer">
                                Taken some music lessons before
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="self_taught"
                                id="self_taught"
                                data-testid="radio-background-self-taught"
                              />
                              <label htmlFor="self_taught" className="cursor-pointer">
                                Self-taught musician
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="intermediate"
                                id="intermediate"
                                data-testid="radio-background-intermediate"
                              />
                              <label htmlFor="intermediate" className="cursor-pointer">
                                Intermediate (3-5 years experience)
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="advanced"
                                id="advanced"
                                data-testid="radio-background-advanced"
                              />
                              <label htmlFor="advanced" className="cursor-pointer">
                                Advanced (5+ years, formal training)
                              </label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Piano Experience</h3>

                  <FormField
                    control={form.control}
                    name="pianoExperience"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-3"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="none"
                                id="none"
                                data-testid="radio-piano-none"
                              />
                              <label htmlFor="none" className="cursor-pointer">
                                No piano experience
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="less_than_1"
                                id="less_than_1"
                                data-testid="radio-piano-less-1"
                              />
                              <label htmlFor="less_than_1" className="cursor-pointer">
                                Less than 1 year
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="1_to_3"
                                id="1_to_3"
                                data-testid="radio-piano-1-3"
                              />
                              <label htmlFor="1_to_3" className="cursor-pointer">
                                1-3 years
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="3_to_5"
                                id="3_to_5"
                                data-testid="radio-piano-3-5"
                              />
                              <label htmlFor="3_to_5" className="cursor-pointer">
                                3-5 years
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="5_plus"
                                id="5_plus"
                                data-testid="radio-piano-5-plus"
                              />
                              <label htmlFor="5_plus" className="cursor-pointer">
                                5+ years
                              </label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Which classes interest you most?</h3>
                <p className="text-sm text-muted-foreground">Select all that apply</p>

                <FormField
                  control={form.control}
                  name="classInterests"
                  render={() => (
                    <FormItem>
                      <div className="space-y-3">
                        {CLASS_INTERESTS.map((interest) => (
                          <FormField
                            key={interest}
                            control={form.control}
                            name="classInterests"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(interest)}
                                    onCheckedChange={(checked) => {
                                      const updated = checked
                                        ? [...(field.value || []), interest]
                                        : field.value?.filter((v) => v !== interest) || [];
                                      field.onChange(updated);
                                    }}
                                    data-testid={`checkbox-class-${interest.toLowerCase().replace(/\s+/g, "-")}`}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  {interest}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 7 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Preferred Call Time</h3>

                <FormField
                  control={form.control}
                  name="preferredCallTime"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-call-time">
                            <SelectValue placeholder="Select a time slot" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CALL_TIMES.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Any specific questions or requirements?"
                          className="resize-none"
                          rows={4}
                          data-testid="textarea-notes"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <div className="flex justify-between pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
                data-testid="button-prev"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {step < totalSteps ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  data-testid="button-next"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={submitMutation.isPending}
                  data-testid="button-submit"
                >
                  {submitMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Submit
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
