import { useCallback, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Link as NextUILink } from "@nextui-org/react";

function Menu() {

  const location = useLocation()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {
      name: "Home",
      paths: ["/", "/home"],
    },
    {
      name: "Dashboard",
      paths: ["/dashboard"],
    }

  ]

	//checks if current path matches with any path in given array
  const isCurrentPath = useCallback((paths: Array<string>) => {
    return paths.some(value => value === location.pathname)
  }, [location.pathname])

  const handleLogin = useCallback(() => {
		navigate('/login')
  }, [])

  return (

    <Navbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen} classNames={{
      item: [
        "flex",
        "relative",
        "h-full",
        "items-center",
        "data-[active=true]:after:content-['']",
        "data-[active=true]:after:absolute",
        "data-[active=true]:after:bottom-0",
        "data-[active=true]:after:left-0",
        "data-[active=true]:after:right-0",
        "data-[active=true]:after:h-[2px]",
        "data-[active=true]:after:rounded-[2px]",
        "data-[active=true]:after:bg-primary",
      ]
    }}>

      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit">UNC INC</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit">UNC INC</p>
        </NavbarBrand>

        {menuItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`} isActive={isCurrentPath(item.paths)}>
            <NextUILink as={Link} to={item.paths[0]} color={isCurrentPath(item.paths) ? "primary" : "foreground"}>
              {item.name}
            </NextUILink>
          </NavbarItem>
        )

        )}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button onPress={handleLogin} color="primary" variant="flat">{"Login"}</Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`} isActive={isCurrentPath(item.paths)}>
            <NextUILink as={Link} to={item.paths[0]} className="w-full" color={isCurrentPath(item.paths) ? "primary" : "foreground"} size="lg" onPress={() => setIsMenuOpen(false)} >
              {item.name}
            </NextUILink>
          </NavbarMenuItem>
        )
        )}
      </NavbarMenu>

    </Navbar>
  );
};

export default Menu;
