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
  FormDescription,
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
  "Improve my piano technique",
  "Grow as a musician",
  "Learn to play my favourite songs",
  "Understand how music works",
  "Become a professional artist",
  "Learn to teach music",
];

const GENRES = [
  "Bollywood",
  "Regional",
  "Western Classical",
  "Jazz Standards",
  "Root Genres (Blues, Folk, etc.)",
  "Pop",
  "Rock",
  "Gospel",
  "Surprise me!",
];

const PIANO_EXPERIENCE_OPTIONS = [
  "Singer who accompanies myself",
  "Church Musician",
  "Play in a Band",
  "Music Producer and record in a DAW as a producer/arranger",
  "Have studied classical piano from Trinity/ABRSM",
  "Self Taught Pianist",
  "Other",
];

const CLASS_OPTIONS = [
  {
    name: "Modular Piano",
    description: "Each module focuses on a specific topic, song, or genre, explored over 2–3 lessons. (60-minute session)",
  },
  {
    name: "Theory & Ear Training",
    description: "Held on alternate weekends, this 60-minute class covers theoretical concepts, improvisation, ear training, rhythm practice and staff notation.",
  },
  {
    name: "Music Gym",
    description: "Held on alternate weekends, this 45-minute class focuses on practical piano workouts - chords, scales, and improvisation - to build rhythm, technique, hand independence and ear training for complete \"3D\" playing.",
  },
  {
    name: "Music Factory",
    description: "This 90-minute session helps students learn to transcribe music purely by ear from full songs to key sections like riffs and hooks. Develops listening, analysis, and transcription skills.",
  },
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
      whatsappNumber: "",
      countryCode: "",
      city: "",
      country: "",
      signupFor: undefined,
      learningGoals: [],
      preferredGenre: [],
      musicBackground: undefined,
      pianoExperience: [],
      pianoExperienceOther: "",
      classInterests: [],
      preferredCallTime: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: CourseBuilderForm) => {
      return await apiRequest("POST", "/api/course-builder", data);
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Thank you for filling out the form! Our course advisor will get in touch with you shortly.",
      });
      localStorage.removeItem(AUTOSAVE_KEY);
      form.reset({
        name: "",
        email: "",
        whatsappNumber: "",
        countryCode: "",
        city: "",
        country: "",
        signupFor: undefined,
        learningGoals: [],
        preferredGenre: [],
        musicBackground: undefined,
        pianoExperience: [],
        pianoExperienceOther: "",
        classInterests: [],
        preferredCallTime: "",
      });
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
      } else {
        form.reset({
          name: "",
          email: "",
          whatsappNumber: "",
          countryCode: "",
          city: "",
          country: "",
          signupFor: undefined,
          learningGoals: [],
          preferredGenre: [],
          musicBackground: undefined,
          pianoExperience: [],
          pianoExperienceOther: "",
          classInterests: [],
          preferredCallTime: "",
        });
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

  const totalSteps = 8;
  const progress = (step / totalSteps) * 100;

  const stepNames = [
    "Personal Details",
    "Who are you signing up for?",
    "What are your learning goals?",
    "Preferred Genre of Study",
    "Music Background",
    "Piano Experience",
    "Class Interests",
    "Preferred Call Time",
  ];

  const validateStep = async (currentStep: number): Promise<boolean> => {
    let fieldsToValidate: (keyof CourseBuilderForm)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ["name", "email", "whatsappNumber", "countryCode", "city", "country"];
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
        fieldsToValidate = ["musicBackground"];
        break;
      case 6:
        fieldsToValidate = ["pianoExperience"];
        break;
      case 7:
        fieldsToValidate = ["classInterests"];
        break;
      case 8:
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

  const pianoExperience = form.watch("pianoExperience");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Build Your Course</DialogTitle>
          <DialogDescription>
            Step {step} of {totalSteps}: {stepNames[step - 1]}
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
                      <FormLabel>Email ID</FormLabel>
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
                          value={showCustomCountryCode ? "custom" : field.value || ""}
                        >
                          <FormControl>
                            <SelectTrigger data-testid="select-country-code">
                              <SelectValue placeholder="Select" />
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
                    name="whatsappNumber"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>WhatsApp Number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="WhatsApp number"
                            data-testid="input-whatsapp"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your city"
                          data-testid="input-city"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your country"
                          data-testid="input-country"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Who are you signing up for?</h3>
                <p className="text-sm text-muted-foreground">
                  Please tell us who you're filling out this form for, so we can tailor the course details accordingly.
                </p>

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
                              value="myself"
                              id="myself"
                              data-testid="radio-signup-myself"
                            />
                            <label htmlFor="myself" className="cursor-pointer">
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
                              value="friend_family"
                              id="friend_family"
                              data-testid="radio-signup-friend"
                            />
                            <label htmlFor="friend_family" className="cursor-pointer">
                              A friend or family member
                            </label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">What are your learning goals?</h3>
                <p className="text-sm text-muted-foreground">
                  Tell us about your goals or what you hope to achieve through a semester at our school.
                </p>

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
                <h3 className="text-lg font-semibold">Preferred Genre of Study</h3>
                <p className="text-sm text-muted-foreground">
                  Which style or genre of music would you like to focus on in your learning?
                </p>

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
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Music Background</h3>
                <p className="text-sm text-muted-foreground">
                  Which of the following best describes where you are in your musical journey?
                </p>

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
                              value="beginner_intermediate"
                              id="beginner_intermediate"
                              data-testid="radio-background-beginner"
                            />
                            <label htmlFor="beginner_intermediate" className="cursor-pointer">
                              Beginner - Intermediate (1–3 years of experience)
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="seasoned_musician"
                              id="seasoned_musician"
                              data-testid="radio-background-seasoned"
                            />
                            <label htmlFor="seasoned_musician" className="cursor-pointer">
                              Seasoned Musician (Recording or Performing Experience)
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="music_producer"
                              id="music_producer"
                              data-testid="radio-background-producer"
                            />
                            <label htmlFor="music_producer" className="cursor-pointer">
                              Music Producer
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="music_educator"
                              id="music_educator"
                              data-testid="radio-background-educator"
                            />
                            <label htmlFor="music_educator" className="cursor-pointer">
                              Music Educator
                            </label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 6 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Piano Experience</h3>
                <p className="text-sm text-muted-foreground">
                  How do you usually play or use the piano in your musical activities?
                </p>

                <FormField
                  control={form.control}
                  name="pianoExperience"
                  render={() => (
                    <FormItem>
                      <div className="space-y-3">
                        {PIANO_EXPERIENCE_OPTIONS.map((option) => (
                          <FormField
                            key={option}
                            control={form.control}
                            name="pianoExperience"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(option)}
                                    onCheckedChange={(checked) => {
                                      const updated = checked
                                        ? [...(field.value || []), option]
                                        : field.value?.filter((v) => v !== option) || [];
                                      field.onChange(updated);
                                    }}
                                    data-testid={`checkbox-piano-${option.toLowerCase().replace(/\s+/g, "-")}`}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  {option}
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

                {pianoExperience?.includes("Other") && (
                  <FormField
                    control={form.control}
                    name="pianoExperienceOther"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Please specify</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Describe your piano experience"
                            data-testid="input-piano-other"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            )}

            {step === 7 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Class Interests</h3>
                <p className="text-sm text-muted-foreground">
                  Which of these classes would you be most interested in joining? Please go through the descriptions before selecting your choice.
                </p>

                <FormField
                  control={form.control}
                  name="classInterests"
                  render={() => (
                    <FormItem>
                      <div className="space-y-4">
                        {CLASS_OPTIONS.map((classOption) => (
                          <FormField
                            key={classOption.name}
                            control={form.control}
                            name="classInterests"
                            render={({ field }) => (
                              <FormItem>
                                <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(classOption.name)}
                                      onCheckedChange={(checked) => {
                                        const updated = checked
                                          ? [...(field.value || []), classOption.name]
                                          : field.value?.filter((v) => v !== classOption.name) || [];
                                        field.onChange(updated);
                                      }}
                                      data-testid={`checkbox-class-${classOption.name.toLowerCase().replace(/\s+/g, "-")}`}
                                    />
                                  </FormControl>
                                  <div className="space-y-1">
                                    <FormLabel className="font-semibold cursor-pointer">
                                      {classOption.name}
                                    </FormLabel>
                                    <FormDescription className="text-sm">
                                      {classOption.description}
                                    </FormDescription>
                                  </div>
                                </div>
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

            {step === 8 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Preferred Call Time</h3>
                <p className="text-sm text-muted-foreground">
                  Thank you for filling out the form! Our course advisor will get in touch with you soon. When would be a convenient time for us to call you? Our working hours are Monday to Saturday, 10:30 AM to 5:30 PM (IST).
                </p>

                <FormField
                  control={form.control}
                  name="preferredCallTime"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="E.g., Weekdays after 2 PM or Saturdays morning"
                          className="resize-none"
                          rows={3}
                          data-testid="textarea-call-time"
                        />
                      </FormControl>
                      {fieldState.isTouched && fieldState.error && (
                        <FormMessage />
                      )}
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
