import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { JobItemType } from "../types/types";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

const JobItem = ({ job }: { job: JobItemType }) => {
  dayjs.extend(relativeTime);

  return (
    <Card sx={{ p: "16px", boxShadow: "3", border: "1px solid #b7b7b733" }}>
      <Stack
        direction={{ xxs: "column", xs: "row" }}
        alignItems="flex-start"
        spacing={4}
      >
        <Box
          border={1}
          width={100}
          sx={{ objectFit: "contain" }}
          height={100}
          borderRadius={2}
          component="img"
          src={job.src}
        />
        <CardContent sx={{ p: 0, flex: 1 }}>
          <Typography component="h3" fontWeight={700} variant="h5">
            {job.title}
          </Typography>
          <Typography component="h4" variant="subtitle1" fontWeight={600}>
            {job.company}
          </Typography>
          <Stack color="gray" direction="row" alignItems="center" spacing={1}>
            <Typography component="span" variant="caption" fontWeight={500}>
              {job.location}
            </Typography>
            <CircleIcon sx={{ fontSize: "8px" }} />
            <Typography component="span" variant="caption" fontWeight={500}>
              {job.type}
            </Typography>
          </Stack>
          <Typography component="p" mb={2} variant="subtitle2" fontWeight={600}>
            {dayjs(job.firstDate).fromNow()}
          </Typography>
          <Stack
            direction="row"
            flexWrap="wrap"
            alignItems="center"
            spacing={2}
          >
            <Button
              sx={{
                textTransform: "capitalize",
                width: { md: "50%", lg: "30%" },
              }}
              variant="contained"
            >
              İlana git
            </Button>
            <Typography fontWeight={500} component="span">
              ({job.application} başvuru)
            </Typography>
          </Stack>
          <Typography fontWeight={700} mt={3} color="red" component="div">
            (It will end {dayjs(job.deadlineDate).fromNow()})
          </Typography>
        </CardContent>
      </Stack>
    </Card>
  );
};

export default JobItem;
