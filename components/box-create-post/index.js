import { Card, Textarea, Button, Stack } from "@chakra-ui/react";

export default function BoxCreatePost({
  variant,
  padding,
  value,
  onChangeValue,
  onClickPost,
  isLoading,
  placeholder,
  textButton,
}) {
  return (
    <Card padding={padding} variant={variant}>
      <Stack>
        <Textarea
          placeholder={placeholder}
          variant="filled"
          value={value}
          onChange={(e) => onChangeValue(e.target.value)}
        />
        <Button
          colorScheme="blue"
          isDisabled={!value}
          onClick={() => onClickPost()}
          isLoading={isLoading}
          size="sm"
        >
          {textButton}
        </Button>
      </Stack>
    </Card>
  );
}

BoxCreatePost.defaultProps = {
  placeholder: `what's happening ...`,
  textButton: "Post",
  variant: "elevated",
  padding: "4",
};
