"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface NavigationMenuConfProps {
	closeMenu: () => void; // Define the type for closeMenu
}

export function NavigationMenuConf({ closeMenu }: NavigationMenuConfProps) {
	const path = usePathname();

	const isActive = (route: string) => path?.startsWith(route);

	return (
		<NavigationMenu>
			<NavigationMenuList className="flex-col md:flex-row">
				{!isActive("/am/provider/register") &&
					!isActive("/am/broker/register") &&
					!isActive("/en-US/provider/register") &&
					!isActive("/en-US/broker/register") && (
						<NavigationMenuItem>
							<Link href="/en-US/home" legacyBehavior passHref>
								<NavigationMenuLink className="bg-transparent">
									<Button
										className={cn(
											(isActive("/am/home") ||
												isActive("/en-US/member") ||
												isActive("/am/member")) &&
												"border-b-4 border-primary text-primary",
											"hover:border-b-4 hover:border-primary hover:bg-transparent hover:text-primary rounded-none transition"
										)}
										variant="ghost"
										onClick={closeMenu}
									>
										Tilla Health Members
									</Button>
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
					)}
				{!isActive("/am/member/register") &&
					!isActive("/am/broker/register") &&
					!isActive("/en-US/member/register") &&
					!isActive("/en-US/broker/register") && (
						<NavigationMenuItem>
							<Link href="/en-US/provider" legacyBehavior passHref>
								<NavigationMenuLink className="bg-transparent">
									<Button
										className={cn(
											(isActive("/am/provider") ||
												isActive("/en-US/provider")) &&
												"border-b-4 border-primary text-primary",
											"hover:border-b-4 hover:border-primary hover:bg-transparent hover:text-primary rounded-none transition"
										)}
										variant="ghost"
										onClick={closeMenu}
									>
										Tilla Health Providers
									</Button>
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
					)}
				{!isActive("/am/member/register") &&
					!isActive("/am/provider/register") &&
					!isActive("/en-US/member/register") &&
					!isActive("/en-US/provider/register") && (
						<NavigationMenuItem>
							<Link href="/en-US/broker" legacyBehavior passHref>
								<NavigationMenuLink className="bg-transparent">
									<Button
										className={cn(
											(isActive("/am/broker") || isActive("/en-US/broker")) &&
												"border-b-4 border-primary text-primary",
											"hover:border-b-4 hover:border-primary hover:bg-transparent hover:text-primary rounded-none transition"
										)}
										variant="ghost"
										onClick={closeMenu}
									>
										Tilla Health Brokers
									</Button>
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
					)}
			</NavigationMenuList>
		</NavigationMenu>
	);
}
