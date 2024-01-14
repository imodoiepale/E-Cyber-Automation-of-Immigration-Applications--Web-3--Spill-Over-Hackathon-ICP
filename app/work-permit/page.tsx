/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/rules-of-hooks */
//@ts-nocheck
"use client";

import { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Control, FieldValues } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

// import fillKepForm from "./fillkepgForm";

import Nav from "../Nav";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { createClient } from '@supabase/supabase-js';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Label } from '@/components/ui/label';

import { type Doc, initJuno, setDoc, deleteDoc } from "@junobuild/core-peer";

const supabaseUrl = 'https://wcmrsrnjtkrmfcjxmxpc.supabase.co';
const supabaseAnonKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjbXJzcm5qdGtybWZjanhteHBjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMjcwNTA2NywiZXhwIjoyMDE4MjgxMDY3fQ.FNNRgt4R-lWE9OWRkO22DbdaKy9Y3HKYs2U1u6XvSXI';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

type FormState = {
    applicantDetails: Record<string, string>;
    qualificationDetails: Record<string, string>;
    companyDetails: Record<string, string>;
    contactDetails: Record<string, string>;
    physicalAddress: Record<string, string>;
    postalAddress: Record<string, string>;
    loginCredentials: Record<string, string>;
};

const Company = () => {
    const [applicants, setApplicants] = useState([]);
    const [selectedApplicant, setSelectedApplicant] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [selectedApplicantData, setSelectedApplicantData] = useState(null);

    const handleInputChange = (e, sectionName) => {
        const { name, value } = e.target;

        console.log(`Input field ${name} in section ${sectionName} updated with value: ${value}`);

        // Use setValue to update the form values
        form.setValue(`${sectionName}.${name}`, value);
    };

    const [formState, setFormState] = useState<FormState>({
        applicantDetails: {
            firstName: '',
            middleName: '',
            lastName: '',
            fullName: '',
            gender: '',
            marritalStatus: '',
            placeOfBirth: '',
            countryOfBirth: '',
            placeOfIssue: '',
            nationality: '',
            dateOfBirth: '',
            PassportRNumber: '',
            ppIssueDate: '',
            ppExpiryDate: '',
        },
        qualificationDetails: {
            universityName: '',
            courseName: '',
            courseStartDate: '',
            courseEndDate: '',
        },
        companyDetails: {
            companyName: '',
            role: '',
            employmentStartDate: '',
            employmentEndDate: '',
        },
        contactDetails: {
            mobileNumber: '',
            emailAddress: '',
        },
        physicalAddress: {
            buildingName: '',
            floorNumber: '',
            blockNumber: '',
            roadName: '',
            areaName: '',
            town: '',
            country: '',
            fullPhysicalAddress: '',
            county: '',
            subCounty: '',
        },
        postalAddress: {
            postalAddress: '',
            postalCode: '',
            postalTown: '',
            fullPostalAddress: '',
        },
        loginCredentials: {
            efnsUsername: '',
            efnsPassword: '',
        },
    });

    const FormSchema = z.object({
        companyDetails: z.object({
            companyName: z.string().nonempty("Company Full Name is required."),
            role: z.string().nonempty("Company Role is required."),
            employmentStartDate: z.string().nonempty("Employment - Start Date is required."),
            employmentEndDate: z.string().nonempty("Employment - End Date is required."),
        }),
        contactDetails: z.object({
            mobileNumberIndia: z.string().nonempty("Mobile Number - India is required."),
            mobileNumberKenya: z.string().nonempty("Mobile Number - Kenya is required."),
            emailAddressCommunication: z.string().nonempty("Email Address - Communication is required."),
            emailAddressItax: z.string().nonempty("Email Address - Itax is required."),
        }),
        physicalAddress: z.object({
            buildingName: z.string().nonempty("Building Name is required."),
            floorNumber: z.string().nonempty("Floor Number is required."),
            blockNumber: z.string().nonempty("Block Number is required."),
            roadName: z.string().nonempty("Road Name is required."),
            areaName: z.string().nonempty("Area Name is required."),
            town: z.string().nonempty("Town is required."),
            country: z.string().nonempty("Country is required."),
            fullPhysicalAddress: z.string().nonempty("Full Physical Address is required."),
            county: z.string().nonempty("County is required."),
            subCounty: z.string().nonempty("Sub-County is required."),
        }),
        postalAddress: z.object({
            postalAddress: z.string().nonempty("Postal Address is required."),
            postalCode: z.string().nonempty("Postal Code is required."),
            postalTown: z.string().nonempty("Postal Town is required."),
            fullPostalAddress: z.string().nonempty("Full Postal Address is required."),
        }),
        loginCredentials: z.object({
            efnsUsername: z.string().nonempty("E-Citizen ID No is required."),
            efnsPassword: z.string().nonempty("E-Citizen Password is required."),
        }),
    });

    const [formData, setFormData] = useState<FormState>({ ...formState });

    const useFormatNames = () => {
        const formatName = (name: string) => (
            name.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\b\w/g, (word) => word.toUpperCase())
        );

        const formatFieldName = (fieldName: string) => formatName(fieldName);
        const formatSectionName = (sectionName: string) => formatName(sectionName);

        return { formatFieldName, formatSectionName };
    };

    const { formatFieldName, formatSectionName } = useFormatNames();

    const generateInputFields = (sectionName: string, form: Control<FieldValues>) => {
        const fields = formState[sectionName];

        const onSubmit = async (data: z.infer<typeof FormSchema>) => {
            try {
                if (Object.keys(form.formState.errors).length > 0) {
                    console.log("Form has validation errors");
                    return;
                }

                await setDoc({
                    collection: "applicants",
                    doc: {
                        key: "p4hsy-kiaaa-aaaal-admza-cai",
                        data: data,
                    },
                });

                console.log("Form submitted successfully", data);
            } catch (error) {
                console.error("Error storing data to Juno Datastore:", error);
            }
        };

        return (
            <div key={sectionName}>
                <h2 className='font-bold py-2'>{formatSectionName(sectionName)}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Object.entries(fields).map(([fieldName, fieldSchema]) => (
                        <FormField
                            key={fieldName}
                            control={form.control}
                            name={`${sectionName}.${fieldName}`}
                            render={({ field }) => (
                                <FormItem key={fieldName}>
                                    <FormLabel>{formatFieldName(fieldName)}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={formatFieldName(fieldName)}
                                            {...field}
                                            value={field.value}
                                            onChange={(e) => handleInputChange(e, sectionName)}
                                            className='w-full'
                                        />
                                    </FormControl>
                                    <FormMessage>{/* Add your error messages logic here */}</FormMessage>
                                </FormItem>
                            )}
                        />
                    ))}
                </div>
                <br />
            </div>
        );
    };

    const MyCompanyForm = () => {
        const form = useForm<z.infer<typeof FormSchema>>({
            resolver: zodResolver(FormSchema),
            defaultValues: formData,
        });

        const onSubmit = async (data: z.infer<typeof FormSchema>) => {
            console.log("Form data submitted:", data);
            if (Object.keys(form.formState.errors).length > 0) {
                console.log("Form has validation errors");
            } else {
                console.log("Form submitted successfully", data);

                setFormData((prevData) => ({
                    ...prevData,
                    applicantDetails: data.applicantDetails,
                    qualificationDetails: data.qualificationDetails,
                    companyDetails: data.companyDetails,
                    contactDetails: data.contactDetails,
                    physicalAddress: data.physicalAddress,
                    postalAddress: data.postalAddress,
                    loginCredentials: data.loginCredentials,
                }));

                await fillKepForm(data, selectedApplicantData);
            }
        };

        useEffect(() => {
            const fetchApplicants = async () => {
                try {
                    const { data, error } = await supabase.from('applicantdetails').select('applicantid, fullname');
                    if (error) {
                        throw error;
                    }
                    setApplicants(data);
                } catch (error) {
                    console.error('Error fetching applicants:', error);
                } finally {
                    setIsLoading(false);
                }
            };

            if (isLoading) {
                fetchApplicants();
            }
        }, []);

        const handleApplicantSelection = (e) => {
            const selectedApplicant = e.target.value;
            setSelectedApplicant(selectedApplicant);

            const selectedApplicantId = applicants.find(applicant => applicant.fullname === selectedApplicant)?.applicantid;
            if (selectedApplicantId) {
                console.log('Selected Applicant ID:', selectedApplicantId);
            }
        };

        const openDialog = async () => {
            if (!selectedApplicant) {
                return;
            }

            try {
                setIsLoading(true);
                const { data, error } = await supabase
                    .from('applicantdetails')
                    .select('*')
                    .eq('applicantid', selectedApplicant)
                    .single();

                if (error) {
                    throw error;
                }

                setSelectedApplicantData(data);
                setIsDialogOpen(true);
            } catch (error) {
                console.error('Error fetching applicant data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const handleDatabaseSubmit = async () => {
            try {
                console.log("FormData:", formData);

                await initJuno({
                    satelliteId: "p4hsy-kiaaa-aaaal-admza-cai",
                });

                const doc = await setDoc({
                    collection: "applicants",
                    doc: {
                        key: `Work-Permit-${new Date().getTime()}`,
                        data: formData,
                    },
                });

                console.log("Data submitted to the database successfully");

                toast("Event has been created", {
                    description: new Date().getTime(),
                    action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                    },
                });
            } catch (error) {
                console.error("Error storing data to Juno Datastore:", error);
            }
        };

        useEffect(() => {
            const deletionTimeout = setTimeout(async () => {
                try {
                    await initJuno({
                        satelliteId: "p4hsy-kiaaa-aaaal-admza-cai",
                    });
                    await deleteDoc({
                        collection: "applicants",
                        doc: {
                            key: "p4hsy-kiaaa-aaaal-admza-cai",
                        },
                    });

                    console.log("Data deleted from the database successfully");
                } catch (error) {
                    console.error("Error deleting data from Juno Datastore:", error);
                }
            }, 30000);

            return () => clearTimeout(deletionTimeout);
        }, []);

        return (
            <div className="flex items-center flex-col justify-between h-screen pt-6 px-24">
                <section className="w-full  ">
                    <Nav />

                    <Card className=" mx-auto m-8">
                        <CardHeader>
                            <CardTitle>Work Permit Info</CardTitle>
                            <CardDescription>Input Personal Details.</CardDescription>
                            <Label htmlFor="applicantSelect" className="text-sm font-semibold text-gray-800">
                                Select Applicant - Sample Data from Temporary Database
                            </Label>
                            <select
                                id="applicantSelect"
                                value={selectedApplicant}
                                onChange={(e) => handleApplicantSelection(e)}
                                className="py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                            >
                                <option key="" value="" disabled>Select Applicant</option>
                                {applicants.map((applicant) => (
                                    <option key={applicant.applicantid} value={applicant.applicantid}>
                                        {applicant.fullname}
                                    </option>
                                ))}
                            </select>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 p-6">
                                    {generateInputFields('applicantDetails', form)}
                                    {generateInputFields('qualificationDetails', form)}
                                    {generateInputFields('companyDetails', form)}
                                    {generateInputFields('physicalAddress', form)}
                                    {generateInputFields('postalAddress', form)}
                                    {generateInputFields('loginCredentials', form)}
                                </form>
                            </Form>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline">Reset</Button>
                            <Button onClick={handleDatabaseSubmit} className="bg-blue-500 text-white animate-bounce">
                                Submit
                            </Button>
                        </CardFooter>
                    </Card>
                </section>
            </div>
        );
    };

    return <MyCompanyForm />;
};

export default Company;