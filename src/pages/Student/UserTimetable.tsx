import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LoadingIndicator from '@/components/ui/loading-indicator';
import axios from '@/services/Axios';
import { UserApplicationsTable } from '@/components/Tables/UserApplicationsTable/UserApplicationsTable.tsx';

const UserTimetable = () => {
    const [schedule, setSchedule] = useState(null);

    useEffect(() => {

    }, []);

    return (
        <Card className="flex flex-row justify-evenly w-full min-h-[800px] h-full">
            <Card className=''>
                <CardHeader>
                    <CardTitle className="text-center">
                        Monday
                    </CardTitle>
                </CardHeader>
                <CardContent>

                </CardContent>
            </Card>
            <Card className=''>
                <CardHeader>
                    <CardTitle className="text-center">
                        Tuesday
                    </CardTitle>
                </CardHeader>
                <CardContent>

                </CardContent>
            </Card>
            <Card className=''>
                <CardHeader>
                    <CardTitle className="text-center">
                        Wednesday
                    </CardTitle>
                </CardHeader>
                <CardContent>

                </CardContent>
            </Card>
            <Card className=''>
                <CardHeader>
                    <CardTitle className="text-center">
                        Thursday
                    </CardTitle>
                </CardHeader>
                <CardContent>

                </CardContent>
            </Card>
            <Card className=''>
                <CardHeader>
                    <CardTitle className="text-center">
                        Friday
                    </CardTitle>
                </CardHeader>
                <CardContent>

                </CardContent>
            </Card>
            <Card className=''>
                <CardHeader>
                    <CardTitle className="text-center">
                        Tuesday
                    </CardTitle>
                </CardHeader>
                <CardContent>

                </CardContent>
            </Card>
        </Card>
    );
};

export default UserTimetable;
