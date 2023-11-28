import React from 'react';
import { Button } from '@/components/ui/button.tsx';
import { LayoutGrid } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Link } from 'react-router-dom';
import { HeaderNavigation } from '@/services/routing/HeaderNavigation.tsx';
import { appLinks } from '@/services/consts/Links.tsx';

const MobileNavigationMenuAppHeader = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default" className="ms-2">
          <LayoutGrid />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-muted-foreground text-center">
            Navigation bar
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <Accordion type="single" collapsible className="w-full">
          {HeaderNavigation().map((navigation, index) => (
            <React.Fragment key={navigation.title}>
              {typeof navigation.path === 'string' ? (
                navigation.title === 'Редактирование документов' ? (
                  <a href={navigation.path} target="_blank">
                    {navigation.title}
                  </a>
                ) : (
                  <Link to={navigation.path}>
                    <AccordionItem value={`item-${index + 1}`}>
                      <SheetClose asChild>
                        <AccordionTrigger isLink={'true'} className="text-xl">
                          {navigation.title}
                        </AccordionTrigger>
                      </SheetClose>
                    </AccordionItem>
                  </Link>
                )
              ) : (
                <AccordionItem value={`item-${index + 1}`}>
                  <AccordionTrigger className="text-xl">
                    {navigation.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    {navigation.path.map((subNavigation) => (
                      <Link
                        key={subNavigation.title}
                        to={subNavigation.path}
                        target={
                          subNavigation.path === appLinks.djangoAdmin
                            ? '_blank'
                            : '_self'
                        }
                      >
                        <SheetClose asChild>
                          <AccordionTrigger
                            isLink={'true'}
                            className="text-lg font-medium text-muted-foreground"
                          >
                            {subNavigation.title}
                          </AccordionTrigger>
                        </SheetClose>
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              )}
            </React.Fragment>
          ))}
        </Accordion>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigationMenuAppHeader;
