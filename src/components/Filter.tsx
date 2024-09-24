import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  Menu,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import PlaceIcon from "@mui/icons-material/Place";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Filtre from "../class/Filtre";
import useJobs from "../context/hooks";

const Filter = () => {
  const { initialJobs, setJobs } = useJobs();
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const handleFilterClick = (filterValue: string) => {
    setFilterValue(filterValue);
    setAnchorEl(null);
    handleFiltre(searchValue, filterValue, selectedLocation);
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedLocation(event.target.value as string);
    handleFiltre(searchValue, filterValue, event.target.value as string);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    handleFiltre(event.target.value, filterValue, selectedLocation);
  };

  const handleFiltre = (
    searchValue: string,
    filterValue: string,
    selectedLocation: string
  ) => {
    let filteredJobs = initialJobs;

    if (selectedLocation)
      filteredJobs = Filtre.locationFiltre(filteredJobs, selectedLocation);

    if (searchValue)
      filteredJobs = Filtre.searchFiltre(filteredJobs, searchValue);

    if (filterValue)
      filteredJobs = Filtre.sortedFiltre(filteredJobs, filterValue);

    setJobs(filteredJobs);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      flexWrap={{ xxs: "wrap", sm: "nowrap" }}
      justifyContent="space-between"
      mt={{ xxs: 4, md: 0 }}
      spacing={{ md: 2 }}
    >
      <Button
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        startIcon={<TuneIcon />}
        variant="contained"
        sx={{ borderRadius: "35px" }}
      >
        Filter
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleFilterClick("titleAZ")}>
          A-Z'ye Sırala
        </MenuItem>
        <MenuItem onClick={() => handleFilterClick("startDate")}>
          En Yeniler
        </MenuItem>
        <MenuItem onClick={() => handleFilterClick("applicationCount")}>
          En Çok Başvuru
        </MenuItem>
      </Menu>
      <Box display="flex" justifyContent="center" alignItems="center">
        <FormControl variant="outlined">
          <Select
            size="small"
            value={selectedLocation}
            onChange={handleChange}
            displayEmpty
            input={
              <OutlinedInput
                startAdornment={
                  <InputAdornment position="start">
                    <PlaceIcon />
                  </InputAdornment>
                }
              />
            }
            sx={{
              minWidth: 100,
              backgroundColor: "white",
            }}
          >
            <MenuItem value="">
              <em>Location</em>
            </MenuItem>
            <MenuItem value="San Francisco">San Francisco</MenuItem>
            <MenuItem value="New York">New York</MenuItem>
            <MenuItem value="Los Angeles">Los Angeles</MenuItem>
            <MenuItem value="Chicago">Chicago</MenuItem>
            <MenuItem value="Miami">Miami</MenuItem>
            <MenuItem value="Austin">Austin</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: { xxs: "100%", sm: "auto" },
        }}
      >
        <TextField
          size="small"
          variant="outlined"
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ ml: "6px" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            backgroundColor: "#6b6b6b33",
            mt: { xxs: "15px", sm: "0px" },
            borderRadius: "20px",
            width: "100%",
            "& .MuiOutlinedInput-root": {
              ml: "0px",
              borderRadius: "20px",
              color: "black",
              "& fieldset": {
                borderColor: "#2323230",
              },
              "& input": {
                color: "black", // White text color
              },
              "&:hover fieldset": {
                boxShadow: "2", // White border on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#33333370", // White border on focus
              },
            },
          }}
          onChange={handleSearchChange}
        />
      </Box>
    </Stack>
  );
};

export default Filter;
